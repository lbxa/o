import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

// import { ClusterComponent } from "./components/cluster";
import { DbComponent } from "./components/db";
// import { RepoComponent } from "./components/repo";

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
  dbUser,
  dbPort,
});

export const dbHostname = db.dbHostname;
export const dbRandomPassword = dbPassword;

const repo = new awsx.ecr.Repository("onex-repo", {
  forceDelete: true,
});

const image = new awsx.ecr.Image("onex-backend-image", {
  repositoryUrl: repo.url,
  context: "../",
  dockerfile: "../packages/backend/backend.Dockerfile",
  platform: "linux/amd64",
});

const cluster = new aws.ecs.Cluster("onex-cluster");
const alb = new awsx.lb.ApplicationLoadBalancer("onex-lb");

const securityGroup = new aws.ec2.SecurityGroup("cluster-security-group", {
  vpcId: vpc.vpcId,
  egress: [
    {
      fromPort: 0,
      toPort: 0,
      protocol: "-1",
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
    },
  ],
});

const appService = new awsx.ecs.FargateService("app-svc", {
  cluster: cluster.arn,
  networkConfiguration: {
    subnets: vpc.privateSubnetIds,
    securityGroups: [securityGroup.id],
  },
  desiredCount: 2,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: "onex-backend",
      image: image.imageUri,
      cpu: 102 /*10% of 1024*/,
      memory: 50 /*MB*/,
      essential: true,
      portMappings: [
        {
          containerPort: Number(backendPort),
          targetGroup: alb.defaultTargetGroup,
        },
      ],
    },
  },
});

export const url = pulumi.interpolate`http://${alb.loadBalancer.dnsName}`;

// const backendRepo = new RepoComponent("onex-backend");

// const backendCluster = new ClusterComponent(
//   "onex-backend-cluster",
//   {
//     vpc,
//     repo: backendRepo.repo,
//     dbHostname: db.dbHostname,
//     dbName: db.dbName,
//     dbPassword,
//     dbUser: db.dbUser,
//     dbPort,
//     backendPort,
//   },
//   { dependsOn: [backendRepo] }
// );

export const backendUrl = backendCluster.backendUrl;
