# Infra

All managed with the lovely [Pulumi](https://www.pulumi.com/) <3

## AWS Config

After installing the AWS CLI, add the config below to `~/.aws/config` and `aws sso login --sso-session=onex` login you in.

```toml
[sso-session onex]
sso_start_url = https://ocorp.awsapps.com/start
sso_region = ap-southeast-2

[profile onex-dev]
sso_session = onex
sso_account_id = <account_id>
sso_role_name = AdministratorAccess
region = ap-southeast-2

[profile onex-prod]
sso_session = onex
sso_account_id = <account-id>
sso_role_name = AdministratorAccess
region = ap-southeast-2
```

## Architecture

Each instance should be live within a subnet of the VPC. Security groups should be used to control traffic to/from all resources.

```mermaid
flowchart LR

subgraph VPC
  A["Public Subnet A"] --> A1
  B["Public Subnet B"] --> B1

  subgraph Private Subset A
    A1["ECS Fargate Service"]
  end

  subgraph Private Subset B
    B1["RDS"]
  end

end
```

![AWS Simple Architecture](./arch.svg)

## IaC

Since the infra is entirely managed with Pulumi, all the resources are defined in TypeScript code. Logical groups have been organised into components.

This will only become easier to maintain and extend as the infra scales in complexity. Pulumi docs are fantastic and should be referred to for any questions.
