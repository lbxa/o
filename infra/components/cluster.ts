/* eslint-disable @stylistic/js/max-len */
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import type { Vpc } from "@pulumi/awsx/ec2";
import * as pulumi from "@pulumi/pulumi";

interface ClusterComponentArgs {
  vpc: Vpc;
  repo: awsx.ecr.Repository;
  dbHostname: pulumi.Output<string>;
  dbName: pulumi.Input<string>;
  dbPassword: pulumi.Output<string>;
  dbUser: pulumi.Input<string>;
  dbPort: pulumi.Input<string>;
  backendPort: pulumi.Input<string>;
}

export class ClusterComponent extends pulumi.ComponentResource {
  private readonly cluster: aws.ecs.Cluster;
  private readonly backendImage: awsx.ecr.Image;
  private readonly lb: awsx.lb.ApplicationLoadBalancer;
  private readonly fargateService: awsx.ecs.FargateService;

  private readonly clusterSecurityGroup: aws.ec2.SecurityGroup;
  private readonly allowHttpTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowHttpsTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowSshTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowRdsTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowBackendTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowAllTrafficEgressIpv4: aws.vpc.SecurityGroupEgressRule;

  public readonly backendUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: ClusterComponentArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("onex:infra:cluster", name, {}, opts);

    this.cluster = new aws.ecs.Cluster(name, {}, { parent: this });

    this.backendImage = new awsx.ecr.Image(
      `${name}-docker-image`,
      {
        imageTag: pulumi.interpolate`${args.repo.url}:latest`,
        repositoryUrl: args.repo.url,
        // paths are relative from the directory of where pulumi entrypoint
        // file is run, not from the directory of this file
        // https://www.pulumi.com/docs/iac/concepts/projects/#project-relative-paths
        context: "../", // root context of the monorepo
        dockerfile: "../packages/backend/backend.Dockerfile",
        platform: "linux/arm64",
      },
      { parent: this }
    );

    this.clusterSecurityGroup = new aws.ec2.SecurityGroup(
      `${name}-security-group`,
      {
        vpcId: args.vpc.vpcId,
        description: "Security group for ECS cluster",
        tags: { Name: `${name}-security-group` },
      },
      { parent: this }
    );

    this.allowRdsTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-rds-traffic-ipv4`,
      {
        description: "Allow RDS traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: Number(args.dbPort),
        toPort: Number(args.dbPort),
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    this.allowHttpTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-http-traffic-ipv4`,
      {
        description: "Allow HTTP traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: 80,
        toPort: 80,
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    this.allowHttpsTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-https-traffic-ipv4`,
      {
        description: "Allow HTTPS traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: 443,
        toPort: 443,
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    this.allowSshTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-ssh-traffic-ipv4`,
      {
        description: "Allow SSH traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: 22,
        toPort: 22,
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    this.allowBackendTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      `${name}-allow-backend-traffic-ipv4`,
      {
        description: "Allow backend traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: Number(args.backendPort),
        toPort: Number(args.backendPort),
        ipProtocol: aws.ec2.ProtocolType.TCP,
      },
      { parent: this }
    );

    this.allowAllTrafficEgressIpv4 = new aws.vpc.SecurityGroupEgressRule(
      `${name}-allow-all-egress-traffic-ipv4`,
      {
        description: "Allow outbound traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: "0.0.0.0/0",
        toPort: 0,
        fromPort: 0,
        ipProtocol: "-1",
      },
      { parent: this }
    );

    // TODO add listener to the web
    // awsx.lb.ApplicationLoadBalancer automatically handles ingress
    // and egress rules automatically
    // https://www.pulumi.com/docs/iac/clouds/aws/guides/elb/#manually-configuring-listeners
    this.lb = new awsx.lb.ApplicationLoadBalancer(
      `${name}-lb`,
      {
        subnetIds: args.vpc.publicSubnetIds,
        securityGroups: [this.clusterSecurityGroup.id],
        listener: {
          port: 80,
          protocol: "HTTP",
        },
        defaultTargetGroup: {
          port: 6969,
          healthCheck: {
            path: "/",
            port: "6969",
            protocol: "HTTP",
            interval: 30,
            timeout: 5,
            healthyThreshold: 2,
            unhealthyThreshold: 2,
          },
        },
      },
      { parent: this }
    );

    this.fargateService = new awsx.ecs.FargateService(
      "service",
      {
        cluster: this.cluster.arn,
        assignPublicIp: true,
        desiredCount: 2,
        taskDefinitionArgs: {
          container: {
            name: `${name}-backend`,
            image: this.backendImage.imageUri,
            cpu: 128,
            memory: 512,
            essential: true,
            portMappings: [
              {
                containerPort: Number(args.backendPort),
                hostPort: Number(args.backendPort),
                protocol: aws.ec2.ProtocolType.TCP,
                targetGroup: this.lb.defaultTargetGroup,
                // targetGroup: this.lb.defaultTargetGroup,
              },
            ],
            environment: [
              {
                name: "DB_HOSTNAME",
                value: args.dbHostname,
              },
              {
                name: "DB_NAME",
                value: args.dbName,
              },
              {
                name: "DB_PASSWORD",
                value: args.dbPassword,
              },
              {
                name: "DB_USER",
                value: args.dbUser,
              },
              {
                name: "DB_PORT",
                value: args.dbPort,
              },
              {
                name: "BACKEND_PORT",
                value: args.backendPort,
              },
            ],
          },
        },
      },
      { parent: this }
    );

    this.backendUrl = pulumi.interpolate`http://${this.lb.loadBalancer.dnsName}`;

    this.registerOutputs({
      backendUrl: this.backendUrl,
    });
  }
}
