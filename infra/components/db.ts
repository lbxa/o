import * as aws from "@pulumi/aws";
import type { Vpc } from "@pulumi/awsx/ec2";
import * as pulumi from "@pulumi/pulumi";

interface DbComponentArgs {
  vpc: Vpc;
}

export class DbComponent extends pulumi.ComponentResource {
  public readonly dbSubnetGroup: aws.rds.SubnetGroup;
  public readonly dbSecurityGroup: aws.ec2.SecurityGroup;

  // inbound/outbound rules
  public readonly allowVpcTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  // public readonly allowOnlyDevTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  public readonly allowAllTrafficIpv4: aws.vpc.SecurityGroupEgressRule;

  private readonly db: aws.rds.Instance;
  public readonly dbHostname: pulumi.Output<string>;

  constructor(
    name: string,
    { vpc: { vpc, privateSubnetIds } }: DbComponentArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("onex:infra:rds", name, {}, opts);

    const config = new pulumi.Config();
    const dbName = config.require("dbName");
    const dbPassword = config.requireSecret("dbPassword");
    const dbUser = config.require("dbUser");
    const dbPort = config.require("dbPort");

    this.dbSubnetGroup = new aws.rds.SubnetGroup(
      `${name}-subnet-group`,
      {
        subnetIds: privateSubnetIds,
        tags: { Name: `${name}-subnet-group` },
      },
      { parent: this }
    );

    this.dbSecurityGroup = new aws.ec2.SecurityGroup(
      `${name}-security-group`,
      {
        name: `${name}-security-group`,
        description: "Security group for RDS MySQL instance",
        vpcId: vpc.id,
        tags: { Name: `${name}-security-group` },
      },
      { parent: this }
    );

    this.allowVpcTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-vpc-traffic-ipv4`,
      {
        description: "Allow traffic from VPC",
        securityGroupId: this.dbSecurityGroup.id,
        cidrIpv4: vpc.cidrBlock,
        fromPort: Number(dbPort),
        toPort: Number(dbPort),
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    // TODO make this rule work
    // this.allowOnlyDevTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
    //   `${name}-allow-only-dev-traffic-ipv4`,
    //   {
    //     description: "Allow traffic from dev IP",
    //     securityGroupId: this.dbSecurityGroup.id,
    //     cidrIpv4: "120.155.83.10", // IP range e.g. 203.0.113.0/24
    //     fromPort: Number(dbPort),
    //     toPort: Number(dbPort),
    //     ipProtocol: aws.ec2.ProtocolType.TCP,
    //   },
    //   { parent: this }
    // );

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
      `${name}-rds-instance`,
      {
        allocatedStorage: 20,
        maxAllocatedStorage: 100,
        dbName,
        engine: "mysql",
        engineVersion: "8.0",
        // T4g run on ARM processors so are more power efficient
        // than the T3 x86 instances. Use the link below for
        // pricing information.
        // https://aws.amazon.com/rds/instance-types/
        instanceClass: aws.rds.InstanceType.T4G_Micro,
        username: dbUser,
        password: dbPassword,
        port: Number(dbPort),
        parameterGroupName: "default.mysql8.0",
        skipFinalSnapshot: true,
        dbSubnetGroupName: this.dbSubnetGroup.name,
        vpcSecurityGroupIds: [this.dbSecurityGroup.id],
        publiclyAccessible: false,
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

    this.dbHostname = this.db.endpoint;

    this.registerOutputs({
      dbHostname: this.dbHostname,
    });
  }
}
