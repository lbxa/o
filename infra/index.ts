import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

// import { ClusterComponent } from "./components/cluster";
import { Db } from "./components/db";
import { devTeam } from "./components/teams";
// import { Repo } from "./components/repo";

const config = new pulumi.Config();

const dbName = config.require("dbName");
const dbUser = config.require("dbUser");
const dbPort = config.require("dbPort");
// const backendPort = config.require("backendPort");

const vpc = new awsx.ec2.Vpc(
  "onex-vpc",
  {
    enableDnsHostnames: true,
    enableDnsSupport: true,
  },
  { protect: true }
);

let dbPassword = config.getSecret("dbPassword");
if (!dbPassword) {
  dbPassword = new random.RandomPassword("db-password", {
    length: 16,
    special: true,
    // mysql password requirements
    overrideSpecial: "!#$%&*()-_=+[]{}<>:?",
  }).result;
}

const db = new Db(
  "onex-db",
  {
    vpc,
    dbName,
    dbPassword,
    dbUser,
    dbPort,
  },
  { protect: true }
);

export const dbHostname = db.dbHostname;
export const dbRandomPassword = dbPassword;

export const devTeamName = devTeam.name;

// const backendRepo = new Repo("onex-backend");

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

// export const backendUrl = backendCluster.backendUrl;
