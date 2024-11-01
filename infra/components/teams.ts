import * as aws from "@pulumi/aws";

import {
  ec2Policy,
  ecrPolicy,
  ecsPolicy,
  elbPolicy,
  logsPolicy,
  passRolePolicy,
  rdsPolicy,
} from "./policies";

const lucas = new aws.iam.User("lucas@onex.social");
// const mary = new aws.iam.User("mary");

// Define a group and assign a policy for it.
const devs = new aws.iam.Group("devs", {
  name: "developers",
  path: "/users/",
});

const devGroupPolicyAttachments = [
  new aws.iam.GroupPolicyAttachment("devs-ec2Policy", {
    group: devs.name,
    policyArn: ec2Policy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-ecsPolicy", {
    group: devs.name,
    policyArn: ecsPolicy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-elbPolicy", {
    group: devs.name,
    policyArn: elbPolicy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-rdsPolicy", {
    group: devs.name,
    policyArn: rdsPolicy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-ecrPolicy", {
    group: devs.name,
    policyArn: ecrPolicy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-logsPolicy", {
    group: devs.name,
    policyArn: logsPolicy.arn,
  }),
  new aws.iam.GroupPolicyAttachment("devs-passRolePolicy", {
    group: devs.name,
    policyArn: passRolePolicy.arn,
  }),
];

// !Note: aws.iam.GroupMembership will conflict with itself
// if used more than once with the same group. To
// non-exclusively manage the users in a group, see the
// aws.iam.UserGroupMembership resource.
export const devTeam = new aws.iam.GroupMembership("dev-team", {
  group: devs.name,
  users: [lucas.name],
});
