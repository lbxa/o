import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const backendPort = config.require("backendPort");
const dbHost = config.require("dbHost");
const dbName = config.require("dbName");
const dbUser = config.require("dbUser");
const dbPort = config.require("dbPort");
const dbPassword = config.requireSecret("dbPassword");

const vpc = new awsx.ec2.Vpc("onex-vpc");
const repo = new awsx.ecr.Repository("onex-registry", { forceDelete: true });
const backendImage = new awsx.ecr.Image("backend-image", {
  repositoryUrl: repo.url,
  context: "../packages/backend",
  platform: "linux/amd64",
});
const lb = new awsx.lb.ApplicationLoadBalancer("lb");
const cluster = new aws.ecs.Cluster("cluster");
const service = new awsx.ecs.FargateService("service", {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: "onex-backend",
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
          name: "DB_HOST",
          value: dbHost,
        },
      ],
    },
  },
});

export const frontendURL = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;
