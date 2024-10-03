import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

import { ClusterComponent } from "./components/cluster";
import { DbComponent } from "./components/db";

const config = new pulumi.Config();

const dbName = config.require("dbName");
const dbPassword = config.requireSecret("dbPassword");
const dbUser = config.require("dbUser");
const dbPort = config.require("dbPort");
const backendPort = config.require("backendPort");

const vpc = new awsx.ec2.Vpc("onex-vpc");

const db = new DbComponent("onex-db", { vpc });

export const dbHostname = db.dbHostname;

const repo = new awsx.ecr.Repository("onex-registry", { forceDelete: true });

// const backendCluster = new ClusterComponent("onex-backend-cluster", {
//   vpc,
//   repo,
//   dbHostname,
// });

// export const backendUrl = backendCluster.backendUrl;

const backendImage = new awsx.ecr.Image("backend-image", {
  repositoryUrl: repo.url,
  context: "../packages/backend",
  platform: "linux/amd64",
});

const lb = new awsx.lb.ApplicationLoadBalancer("lb", {
  subnetIds: vpc.publicSubnetIds,
});

const cluster = new aws.ecs.Cluster("cluster");

const clusterSecurityGroup = new aws.ec2.SecurityGroup(
  "onex-cluster-security-group",
  {
    vpcId: vpc.vpcId,
    description: "Security group for ECS cluster",
    tags: { Name: "onex-cluster-security-group" },
  }
);

const allowHttpTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
  "allow-http-traffic-ipv4",
  {
    description: "Allow HTTP traffic",
    securityGroupId: clusterSecurityGroup.id,
    cidrIpv4: vpc.vpc.cidrBlock,
    fromPort: 80,
    toPort: 80,
    ipProtocol: "tcp",
  }
);

const allowHttpsTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
  "allow-https-traffic-ipv4",
  {
    description: "Allow HTTPS traffic",
    securityGroupId: clusterSecurityGroup.id,
    cidrIpv4: vpc.vpc.cidrBlock,
    fromPort: 443,
    toPort: 443,
    ipProtocol: "tcp",
  }
);

const allowBackendTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
  "allow-backend-traffic-ipv4",
  {
    description: "Allow backend traffic",
    securityGroupId: clusterSecurityGroup.id,
    cidrIpv4: vpc.vpc.cidrBlock,
    fromPort: Number(backendPort),
    toPort: Number(backendPort),
    ipProtocol: "tcp",
  }
);

const allowAllTrafficEgressIpv4 = new aws.vpc.SecurityGroupEgressRule(
  "allow-all-egress-traffic-ipv4",
  {
    description: "Allow outbound traffic",
    securityGroupId: clusterSecurityGroup.id,
    cidrIpv4: "0.0.0.0/0",
    toPort: 0,
    fromPort: 0,
    ipProtocol: "-1",
  }
);

const service = new awsx.ecs.FargateService("service", {
  cluster: cluster.arn,
  assignPublicIp: true,
  desiredCount: 1,
  taskDefinitionArgs: {
    container: {
      name: `onex-backend`,
      image: backendImage.imageUri,
      cpu: 128,
      memory: 512,
      essential: true,
      portMappings: [
        {
          containerPort: Number(backendPort),
          targetGroup: lb.defaultTargetGroup,
        },
      ],
      environment: [
        {
          name: "DB_HOSTNAME",
          value: dbHostname,
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

// eslint-disable-next-line @stylistic/js/max-len
export const frontendURL = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;
