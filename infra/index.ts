import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const backendPort = config.require("backendPort");
const dbName = config.require("dbName");
const dbPassword = config.requireSecret("dbPassword");
const dbUser = config.require("dbUser");
const dbPort = config.require("dbPort");

const vpc = new awsx.ec2.Vpc("onex-vpc");

const dbSubnetGroup = new aws.rds.SubnetGroup("onex-db-subnet-group", {
  subnetIds: vpc.privateSubnetIds,
  tags: { Name: "onex-db-subnet-group" },
});

const dbSecurityGroup = new aws.ec2.SecurityGroup("onex-db-security-group", {
  vpcId: vpc.vpcId,
  description: "Security group for RDS MySQL instance",
  ingress: [
    // Allow traffic from ECS tasks
    // {
    //   protocol: "tcp",
    //   fromPort: Number(dbPort),
    //   toPort: Number(dbPort),
    //   // Replace with your ECS tasks' security group
    //   // For example, if your ECS service has a security group 'ecsServiceSg'
    //   // you would reference it here
    //   // For demonstration, allowing from the VPC
    //   cidrBlocks: [vpc.privateSubnetIds],
    // },
    // Allow traffic from developers' IPs
    // {
    //   protocol: "tcp",
    //   fromPort: Number(dbPort),
    //   toPort: Number(dbPort),
    //   cidrBlocks: ["49.180.215.213/24"],
    //   description: "Allow access from developers' IPs",
    // },
  ],
  egress: [
    {
      protocol: "-1",
      fromPort: 0,
      toPort: 0,
      cidrBlocks: ["0.0.0.0/0"],
    },
  ],
  tags: { Name: "onex-db-security-group" },
});

const db = new aws.rds.Instance("onex-db", {
  allocatedStorage: 20,
  maxAllocatedStorage: 100,
  dbName,
  engine: "mysql",
  engineVersion: "8.0",
  instanceClass: aws.rds.InstanceType.T3_Micro,
  username: dbUser,
  password: dbPassword,
  port: Number(dbPort),
  parameterGroupName: "default.mysql8.0",
  skipFinalSnapshot: true,
  dbSubnetGroupName: dbSubnetGroup.name,
  vpcSecurityGroupIds: [dbSecurityGroup.id],
  publiclyAccessible: false,
  multiAz: false, // high availability
  storageType: "gp2", // Or "gp3" for better performance
  backupRetentionPeriod: 7,
  backupWindow: "03:00-06:00",
  // maintenanceWindow: "Mon:04:00-Mon:05:00",
  tags: { Name: "onex-db" },
});

export const dbHostname = db.endpoint;

// const repo = new awsx.ecr.Repository("onex-registry", { forceDelete: true });
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
//     ingress: [
//       {
//         protocol: "tcp",
//         fromPort: 80,
//         toPort: 80,
//         cidrBlocks: ["0.0.0.0/0"],
//         description: "Allow HTTP traffic",
//       },
//       {
//         protocol: "tcp",
//         fromPort: 443,
//         toPort: 443,
//         cidrBlocks: ["0.0.0.0/0"],
//         description: "Allow HTTPS traffic",
//       },
//       {
//         protocol: "tcp",
//         fromPort: Number(backendPort),
//         toPort: Number(backendPort),
//         cidrBlocks: ["0.0.0.0/0"],
//         description: "Allow backend traffic",
//       },
//     ],
//     egress: [
//       {
//         protocol: "-1",
//         fromPort: 0,
//         toPort: 0,
//         cidrBlocks: ["0.0.0.0/0"],
//         description: "Allow all outbound traffic",
//       },
//     ],
//     tags: { Name: "onex-cluster-security-group" },
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

// export const frontendURL = pulumi.interpolate`http://${lb.loadBalancer.dnsName}`;
