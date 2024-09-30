# Infra

All managed [Pulumi](https://www.pulumi.com/).

## AWS Config

After installing the AWS CLI, add the config below to `~/.aws/config` and `aws sso login --sso-session=onex` login you in.

```toml
[sso-session onex]
sso_start_url = https://ocorp.awsapps.com/start
sso_region = ap-southeast-2

[profile onex-dev]
sso_session = onex
sso_account_id = 038462772119
sso_role_name = AdministratorAccess
region = ap-southeast-2

[profile onex-prod]
sso_session = onex
sso_account_id = <account-id>j
sso_role_name = AdministratorAccess
region = ap-southeast-2
```
