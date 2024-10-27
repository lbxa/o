import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

import { ClusterComponent } from "./components/cluster";
import { DbComponent } from "./components/db";
import { RepoComponent } from "./components/repo";

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
  whitelistedIp: pulumi.output("49.179.38.181"),
  dbUser,
  dbPort,
});

export const dbHostname = db.dbHostname;
export const dbRandomPassword = dbPassword;

const backendRepo = new RepoComponent("onex-backend");

const backendCluster = new ClusterComponent(
  "onex-backend-cluster",
  {
    vpc,
    repo: backendRepo.repo,
    dbHostname: db.dbHostname,
    dbName: db.dbName,
    dbPassword,
    dbUser: db.dbUser,
    dbPort,
    backendPort,
  },
  { dependsOn: [backendRepo] }
);

export const backendUrl = backendCluster.backendUrl;
