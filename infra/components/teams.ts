import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const lucas = new aws.iam.User("lucas@onex.social", {
  name: "lucas@onex.social",
});
const jamie = new aws.iam.User("jamie@onex.social", {
  name: "jamie@onex.social",
});
// const mary = new aws.iam.User("mary");

// Define a group and assign a policy for it.
const devs = new aws.iam.Group("devs", {
  name: "developers",
  path: "/users/",
});

const product = new aws.iam.Group("product", {
  name: "product",
  path: "/users/",
});

const _devsEc2Policy = new aws.iam.GroupPolicy("devs-ec2Policy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ec2:Describe*",
          "ec2:GetConsoleOutput",
          "ec2:RunInstances",
          "ec2:StartInstances",
          "ec2:StopInstances",
          "ec2:TerminateInstances",
          "ec2:CreateTags",
          "ec2:DeleteTags",
          // Add other EC2 actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

const _devsEcsPolicy = new aws.iam.GroupPolicy("devs-ecsPolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ecs:Describe*",
          "ecs:List*",
          "ecs:RegisterTaskDefinition",
          "ecs:DeregisterTaskDefinition",
          "ecs:CreateService",
          "ecs:UpdateService",
          "ecs:DeleteService",
          "ecs:RunTask",
          "ecs:StartTask",
          "ecs:StopTask",
          "acm:*",
          // Add other ECS actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

// Certificate Manager Policy
const _devsCertificateManagerPolicy = new aws.iam.GroupPolicy(
  "devs-certificateManagerPolicy",
  {
    group: devs.id,
    policy: pulumi.output({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: [
            "acm:ListCertificates",
            "acm:DescribeCertificate",
            "acm:ExportCertificate",
            "acm:GetAccountConfiguration",
            "acm:GetCertificate",
            "acm:ListTagsForCertificate",
            "acm:DeleteCertificate",
            "acm:ImportCertificate",
            "acm:PutAccountConfiguration",
            "acm:RenewCertificate",
            "acm:RequestCertificate",
            "acm:ResendValidationEmail",
            "acm:UpdateCertificateOptions",
            "acm:AddTagsToCertificate",
            "acm:RemoveTagsFromCertificate",
          ],
          Resource: "*",
        },
      ],
    }),
  }
);

const _devsElbPolicy = new aws.iam.GroupPolicy("devs-elbPolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "elasticloadbalancing:Describe*",
          "elasticloadbalancing:CreateLoadBalancer",
          "elasticloadbalancing:ConfigureHealthCheck",
          "elasticloadbalancing:RegisterTargets",
          "elasticloadbalancing:DeregisterTargets",
          "elasticloadbalancing:DeleteLoadBalancer",
          // Add other ELB actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

const _devsRdsPolicy = new aws.iam.GroupPolicy("devs-rdsPolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "rds:Describe*",
          "rds:CreateDBInstance",
          "rds:ModifyDBInstance",
          "rds:DeleteDBInstance",
          "rds:StartDBInstance",
          "rds:StopDBInstance",
          // Add other RDS actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

const _devsEcrPolicy = new aws.iam.GroupPolicy("devs-ecrPolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetRepositoryPolicy",
          "ecr:DescribeRepositories",
          "ecr:ListImages",
          "ecr:BatchGetImage",
          "ecr:PutImage",
          // Add other ECR actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

const _devsLogsPolicy = new aws.iam.GroupPolicy("devs-logsPolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          // Add other CloudWatch Logs actions as needed
        ],
        Resource: "*",
      },
    ],
  }),
});

const _devsPassRolePolicy = new aws.iam.GroupPolicy("devs-passRolePolicy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["iam:PassRole"],
        Resource: "*",
        Condition: {
          StringEquals: {
            "iam:PassedToService": [
              "ec2.amazonaws.com",
              "ecs.amazonaws.com",
              "elasticloadbalancing.amazonaws.com",
            ],
          },
        },
      },
    ],
  }),
});

const _devsS3Policy = new aws.iam.GroupPolicy("devs-s3Policy", {
  group: devs.id,
  policy: pulumi.output({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          // List and read bucket contents
          "s3:ListBucket",
          "s3:GetBucketLocation",
          "s3:GetObject",
          "s3:GetObjectVersion",

          // Upload/modify objects
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:DeleteObject",

          // Multipart uploads
          "s3:ListMultipartUploadParts",
          "s3:AbortMultipartUpload",

          // Bucket metadata/tags
          "s3:GetBucketTagging",
          "s3:PutBucketTagging",

          // Object metadata/tags
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",

          // Versioning
          "s3:GetBucketVersioning",
          "s3:ListBucketVersions",

          // Console access
          "s3:ListAllMyBuckets",
          "s3:GetBucketAcl",
          "s3:GetBucketPolicy",
          "s3:GetBucketPolicyStatus",
          "s3:GetAccountPublicAccessBlock",
          "s3:GetBucketPublicAccessBlock",
          "s3:DescribeJob",
        ],
        Resource: [
          "*", // Required for ListAllMyBuckets and some global actions
        ],
      },
    ],
  }),
});

// !Note: aws.iam.GroupMembership will conflict with itself
// if used more than once with the same group. To
// non-exclusively manage the users in a group, see the
// aws.iam.UserGroupMembership resource.
export const devTeam = new aws.iam.GroupMembership("dev-team", {
  group: devs.id,
  users: [lucas.id],
});

export const productTeam = new aws.iam.GroupMembership("product-team", {
  group: product.id,
  users: [lucas.id, jamie.id],
});

// Create access keys for users
export const lucasAccessKey = new aws.iam.AccessKey("lucas-access-key", {
  user: lucas.name,
  // pgpKey: "", // Add PGP key if you want to encrypt the secret
});

export const jamieAccessKey = new aws.iam.AccessKey("jamie-access-key", {
  user: jamie.name,
  // pgpKey: "", // Add PGP key if you want to encrypt the secret
});

// Export the access key IDs
export const lucasAccessKeyId = lucasAccessKey.id;
export const jamieAccessKeyId = jamieAccessKey.id;

// If not using PGP encryption, you can also export the secrets
// Note: These will be visible in the Pulumi state file
export const lucasSecretKey = lucasAccessKey.secret;
export const jamieSecretKey = jamieAccessKey.secret;
