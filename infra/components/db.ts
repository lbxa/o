/* eslint-disable @stylistic/js/max-len */
import * as aws from "@pulumi/aws";
import type { Vpc } from "@pulumi/awsx/ec2";
import * as pulumi from "@pulumi/pulumi";

interface DbComponentArgs {
  vpc: Vpc;
  dbName: pulumi.Input<string>;
  dbPassword: pulumi.Output<string>;
  dbUser: pulumi.Input<string>;
  dbPort: pulumi.Input<string>;
  whitelistedIp: pulumi.Output<string>;
}

export class DbComponent extends pulumi.ComponentResource {
  public readonly dbSubnetGroup: aws.rds.SubnetGroup;
  public readonly dbSecurityGroup: aws.ec2.SecurityGroup;

  // inbound/outbound rules
  public readonly allowVpcTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  public readonly allowWhitelistedIpTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  public readonly allowAllTrafficIpv4: aws.vpc.SecurityGroupEgressRule;

  private readonly db: aws.rds.Instance;
  public readonly dbHostname: pulumi.Output<string>;
  public readonly dbName: pulumi.Output<string>;
  public readonly dbUser: pulumi.Output<string>;
  public readonly dbPassword: pulumi.Output<string | undefined>;

  constructor(
    name: string,
    args: DbComponentArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("onex:infra:rds", name, {}, opts);

    this.dbSubnetGroup = new aws.rds.SubnetGroup(
      `${name}-subnet-group`,
      {
        // use public subnets for now to access from local machines in
        // production, use private subnets with higher security measures
        // https://repost.aws/knowledge-center/rds-connectivity-instance-subnet-vpc
        subnetIds: args.vpc.publicSubnetIds,
        tags: { Name: `${name}-subnet-group` },
      },
      { parent: this }
    );

    this.dbSecurityGroup = new aws.ec2.SecurityGroup(
      `${name}-security-group`,
      {
        name: `${name}-security-group`,
        description: "Security group for RDS MySQL instance",
        vpcId: args.vpc.vpcId,
        tags: { Name: `${name}-security-group` },
      },
      { parent: this }
    );

    this.allowVpcTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-vpc-traffic-ipv4`,
      {
        description: "Allow traffic from VPC",
        securityGroupId: this.dbSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: Number(args.dbPort),
        toPort: Number(args.dbPort),
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    // TODO make this rule work
    this.allowWhitelistedIpTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-whitelisted-ip-traffic-ipv4`,
      {
        description: "Allow whitelisted traffic from dev IPs",
        securityGroupId: this.dbSecurityGroup.id,
        cidrIpv4: pulumi.interpolate`${args.whitelistedIp}/32`,
        fromPort: Number(args.dbPort),
        toPort: Number(args.dbPort),
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    // TODO outbound rules might not apply to RDS instances
    this.allowAllTrafficIpv4 = new aws.vpc.SecurityGroupEgressRule(
      `${name}-allow-all-egress-traffic-ipv4`,
      {
        description: "Allow all outbound traffic",
        securityGroupId: this.dbSecurityGroup.id,
        cidrIpv4: "0.0.0.0/0",
        ipProtocol: "-1",
        toPort: 0,
        fromPort: 0,
      },
      { parent: this }
    );

    this.db = new aws.rds.Instance(
      `${name}-rds`,
      {
        allocatedStorage: 20,
        maxAllocatedStorage: 100,
        dbName: args.dbName,
        engine: "postgres",
        engineVersion: "16",
        // T4g run on ARM processors so are more power efficient
        // than the T3 x86 instances. Use the link below for
        // pricing information.
        // https://aws.amazon.com/rds/instance-types/
        instanceClass: aws.rds.InstanceType.T4G_Micro,
        username: args.dbUser,
        password: args.dbPassword,
        port: Number(args.dbPort),
        parameterGroupName: "default.postgres16",
        skipFinalSnapshot: true,
        dbSubnetGroupName: this.dbSubnetGroup.name,
        vpcSecurityGroupIds: [this.dbSecurityGroup.id],
        publiclyAccessible: true,
        // high availability
        multiAz: false,
        // "gp3" is more cost effective than gp2
        storageType: "gp3",
        backupRetentionPeriod: 7,
        backupWindow: "03:00-06:00",
        // maintenanceWindow: "Mon:04:00-Mon:05:00",
        tags: { Name: "onex-db" },
      },
      { parent: this }
    );

    // format: endpoint:port
    // remove port from endpoint to get db hostname
    this.dbHostname = pulumi
      .output(this.db.endpoint)
      .apply((endpoint) => endpoint.split(":")[0]);
    this.dbName = this.db.dbName;
    this.dbUser = this.db.username;
    this.dbPassword = this.db.password;

    this.registerOutputs({
      dbHostname: this.dbHostname,
      dbName: this.dbName,
      dbUser: this.dbUser,
      dbPassword: this.dbPassword,
    });
  }
}
