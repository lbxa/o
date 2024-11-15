import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// **EC2 Permissions Policy**
export const ec2Policy = new aws.iam.Policy("ec2Policy", {
  description: "EC2 permissions for developers",
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

// **ECS Permissions Policy**
export const ecsPolicy = new aws.iam.Policy("ecsPolicy", {
  description: "ECS permissions for developers",
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

export const certificateManagerPolicy = new aws.iam.Policy(
  "certificateManagerPolicy",
  {
    description: "Certificate Manager permissions for developers",
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

// **Elastic Load Balancing Permissions Policy**
export const elbPolicy = new aws.iam.Policy("elbPolicy", {
  description: "ELB permissions for developers",
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

// **RDS Permissions Policy**
export const rdsPolicy = new aws.iam.Policy("rdsPolicy", {
  description: "RDS permissions for developers",
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

// **ECR Permissions Policy**
export const ecrPolicy = new aws.iam.Policy("ecrPolicy", {
  description: "ECR permissions for developers",
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

// **CloudWatch Logs Permissions Policy**
export const logsPolicy = new aws.iam.Policy("logsPolicy", {
  description: "CloudWatch Logs permissions for developers",
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

// **IAM PassRole Permission Policy**
export const passRolePolicy = new aws.iam.Policy("passRolePolicy", {
  description: "Allows passing roles to AWS services",
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
