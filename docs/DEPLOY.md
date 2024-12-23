# Deployment

## Publishing to the App Store

Follow [these instructions](https://docs.expo.dev/submit/ios/).

> [!NOTE]
> If you need to move the binary builds locally with `--local` for debugging there are missing Apple
> certificates you'll need to download [Github Isssue](https://github.com/expo/eas-cli/issues/1331#issuecomment-1235603312).

## Deploying the backend to AWS

> [!NOTE]
> These are temporary instructions until the DevOps workflow gets streamlined.

0. Copy-paste the credentials from the access portal with ECR pull/push permissions:

    ```bash
    export AWS_ACCESS_KEY_ID=<your-access-key-id>
    export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
    export AWS_SESSION_TOKEN=<your-session-token>
    ```

1. Ensure the database migrations are up to date (after whitelisting current IP):

    ```bash
    NODE_ENV=<env> pnpm turbo migrate:push
    ```

2. From the root of the monorepo:

    ```bash
    docker build -t onex-backend:latest -f libs/api/api.Dockerfile .
    ```

3. Login to the ECR repository:

    ```bash
    aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 038462772119.dkr.ecr.ap-southeast-2.amazonaws.com
    ```

4. Tag the image:

    ```bash
    docker tag onex-backend:latest 038462772119.dkr.ecr.ap-southeast-2.amazonaws.com/onex/backend
    ```

5. Push the image to the ECR repository:

    ```bash
    docker push 038462772119.dkr.ecr.ap-southeast-2.amazonaws.com/onex/backend 
    ```

6. Deploy the image to the ECS cluster (copy-paste the credentials from the access portal with ECS push permissions):

    ```bash
    aws ecs update-service --cluster backend-cluster --service onex-fargate-service --force-new-deployment
    ```
