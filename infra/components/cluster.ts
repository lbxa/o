/* eslint-disable @stylistic/js/max-len */
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import type { Vpc } from "@pulumi/awsx/ec2";
import * as pulumi from "@pulumi/pulumi";

interface ClusterComponentArgs {
  vpc: Vpc;
  repo: awsx.ecr.Repository;
  dbHostname: pulumi.Output<string>;
}

export class ClusterComponent extends pulumi.ComponentResource {
  private readonly cluster: aws.ecs.Cluster;
  private readonly backendImage: awsx.ecr.Image;
  private readonly lb: awsx.lb.ApplicationLoadBalancer;
  private readonly fargateService: awsx.ecs.FargateService;

  private readonly clusterSecurityGroup: aws.ec2.SecurityGroup;
  private readonly allowHttpTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowHttpsTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowBackendTrafficIpv4: aws.vpc.SecurityGroupIngressRule;
  private readonly allowAllTrafficEgressIpv4: aws.vpc.SecurityGroupEgressRule;

  public readonly backendUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: ClusterComponentArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("onex:infra:cluster", name, {}, opts);

    const config = new pulumi.Config();

    const dbName = config.require("dbName");
    const dbPassword = config.requireSecret("dbPassword");
    const dbUser = config.require("dbUser");
    const dbPort = config.require("dbPort");
    const backendPort = config.require("backendPort");

    this.cluster = new aws.ecs.Cluster(name, {}, { parent: this });

    this.backendImage = new awsx.ecr.Image(
      "backend-image",
      {
        repositoryUrl: args.repo.url,
        context: "../../packages/backend",
        platform: "linux/amd64",
      },
      { parent: this }
    );

    this.lb = new awsx.lb.ApplicationLoadBalancer(
      `${name}-lb`,
      { subnetIds: args.vpc.publicSubnetIds },
      { parent: this }
    );

    this.clusterSecurityGroup = new aws.ec2.SecurityGroup(
      `${name}-security-group`,
      {
        vpcId: args.vpc.vpcId,
        description: "Security group for ECS cluster",
        tags: { Name: "onex-cluster-security-group" },
      },
      { parent: this }
    );

    this.allowHttpTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      "allow-http-traffic-ipv4",
      {
        description: "Allow HTTP traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: 80,
        toPort: 80,
        ipProtocol: "tcp",
      },
      { parent: this }
    );

    this.allowHttpsTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      "allow-https-traffic-ipv4",
      {
        description: "Allow HTTPS traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: 443,
        toPort: 443,
        ipProtocol: "tcp",
      },
      { parent: this }
    );

    this.allowBackendTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
      "allow-backend-traffic-ipv4",
      {
        description: "Allow backend traffic",
        securityGroupId: this.clusterSecurityGroup.id,
        cidrIpv4: args.vpc.vpc.cidrBlock,
        fromPort: Number(backendPort),
        toPort: Number(backendPort),
        ipProtocol: "tcp",
      },
      { parent: this }
    );

    this.allowAllTrafficEgressIpv4 = new aws.vpc.SecurityGroupEgressRule(
      "allow-all-egress-traffic-ipv4",
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

    this.fargateService = new awsx.ecs.FargateService("service", {
      cluster: this.cluster.arn,
      assignPublicIp: true,
      desiredCount: 1,
      taskDefinitionArgs: {
        container: {
          name: `${name}-backend`,
          image: this.backendImage.imageUri,
          cpu: 128,
          memory: 512,
          essential: true,
          portMappings: [
            {
              containerPort: Number(backendPort),
              targetGroup: this.lb.defaultTargetGroup,
            },
          ],
          environment: [
            {
              name: "DB_HOSTNAME",
              value: args.dbHostname,
            },
            {
              name: "DB_NAME",
              value: dbName,
            },
            {
              name: "DB_PASSWORD", // TODO move to secure secrets
              value: dbPassword,
            },
            {
              name: "DB_USER",
              value: dbUser,
            },
            {
              name: "DB_PORT",
              value: dbPort,
            },
            {
              name: "BACKEND_PORT",
              value: backendPort,
            },
          ],
        },
      },
    });

    this.backendUrl = pulumi.interpolate`http://${this.lb.loadBalancer.dnsName}`;

    this.registerOutputs({
      backendUrl: this.backendUrl,
    });
  }
}
