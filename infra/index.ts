import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

import { ClusterComponent } from "./components/cluster";
import { DbComponent } from "./components/db";

const config = new pulumi.Config();

const dbName = config.require("dbName");
const dbUser = config.require("dbUser");
const dbPort = config.require("dbPort");
const backendPort = config.require("backendPort");

const vpc = new awsx.ec2.Vpc("onex-vpc", {
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

let dbPassword = config.getSecret("dbPassword");
if (!dbPassword) {
  dbPassword = new random.RandomPassword("db-password", {
    length: 16,
    special: true,
    // mysql password requirements
    overrideSpecial: "!#$%&*()-_=+[]{}<>:?",
  }).result;
}

const db = new DbComponent("onex-db", {
  vpc,
  dbName,
  dbPassword,
  whitelistedIp: pulumi.output("120.155.83.10"),
  dbUser,
  dbPort,
});

export const dbHostname = db.dbHostname;

export const dbRandomPassword = dbPassword;

const repo = new awsx.ecr.Repository("onex-backend", {
  forceDelete: true,
  lifecyclePolicy: {
    rules: [
      {
        tagStatus: awsx.ecr.LifecycleTagStatus.Untagged,
        description: "Expire images older than 7 days",
        maximumAgeLimit: 7,
        maximumNumberOfImages: 10,
      },
    ],
  },
});

const backendCluster = new ClusterComponent("onex-backend-cluster", {
  vpc,
  repo,
  dbHostname: db.dbHostname,
  dbName: db.dbName,
  dbPassword,
  dbUser: db.dbUser,
  dbPort,
  backendPort,
});

export const backendUrl = backendCluster.backendUrl;

/// !WARNING

// const backendImage = new awsx.ecr.Image("backend-image", {
//   repositoryUrl: repo.url,
//   context: "../packages/backend",
//   platform: "linux/amd64",
// });

// const lb = new awsx.lb.ApplicationLoadBalancer("lb", {
//   subnetIds: vpc.publicSubnetIds,
// });

// const cluster = new aws.ecs.Cluster("cluster");

// const clusterSecurityGroup = new aws.ec2.SecurityGroup(
//   "onex-cluster-security-group",
//   {
//     vpcId: vpc.vpcId,
//     description: "Security group for ECS cluster",
//     tags: { Name: "onex-cluster-security-group" },
//   }
// );

// const allowHttpTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
//   "allow-http-traffic-ipv4",
//   {
//     description: "Allow HTTP traffic",
//     securityGroupId: clusterSecurityGroup.id,
//     cidrIpv4: vpc.vpc.cidrBlock,
//     fromPort: 80,
//     toPort: 80,
//     ipProtocol: "tcp",
//   }
// );

// const allowHttpsTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
//   "allow-https-traffic-ipv4",
//   {
//     description: "Allow HTTPS traffic",
//     securityGroupId: clusterSecurityGroup.id,
//     cidrIpv4: vpc.vpc.cidrBlock,
//     fromPort: 443,
//     toPort: 443,
//     ipProtocol: "tcp",
//   }
// );

// const allowBackendTrafficIpv4 = new aws.vpc.SecurityGroupIngressRule(
//   "allow-backend-traffic-ipv4",
//   {
//     description: "Allow backend traffic",
//     securityGroupId: clusterSecurityGroup.id,
//     cidrIpv4: vpc.vpc.cidrBlock,
//     fromPort: Number(backendPort),
//     toPort: Number(backendPort),
//     ipProtocol: "tcp",
//   }
// );

// const allowAllTrafficEgressIpv4 = new aws.vpc.SecurityGroupEgressRule(
//   "allow-all-egress-traffic-ipv4",
//   {
//     description: "Allow outbound traffic",
//     securityGroupId: clusterSecurityGroup.id,
//     cidrIpv4: "0.0.0.0/0",
//     toPort: 0,
//     fromPort: 0,
//     ipProtocol: "-1",
//   }
// );

// const service = new awsx.ecs.FargateService("service", {
//   cluster: cluster.arn,
//   assignPublicIp: true,
//   desiredCount: 1,
//   taskDefinitionArgs: {
//     container: {
//       name: `onex-backend`,
//       image: backendImage.imageUri,
//       cpu: 128,
//       memory: 512,
//       essential: true,
//       portMappings: [
//         {
//           containerPort: Number(backendPort),
//           targetGroup: lb.defaultTargetGroup,
//         },
//       ],
//       environment: [
//         {
//           name: "DB_HOSTNAME",
//           value: dbHostname,
//         },
//         {
//           name: "DB_NAME",
//           value: dbName,
//         },
//         {
//           name: "DB_PASSWORD", // TODO move to secure secrets
//           value: dbPassword,
//         },
//         {
//           name: "DB_USER",
//           value: dbUser,
//         },
//         {
//           name: "DB_PORT",
//           value: dbPort,
//         },
//         {
//           name: "BACKEND_PORT",
//           value: backendPort,
//         },
//       ],
//     },
//   },
// });

// // eslint-disable-next-line @stylistic/js/max-len
// export const frontendURL = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;
