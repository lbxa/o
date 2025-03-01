import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

interface BucketComponentArgs {
  bucketName: string;
  environment: string;
}

export class BucketComponent extends pulumi.ComponentResource {
  public readonly bucket: aws.s3.BucketV2;
  public readonly bucketPolicy: aws.s3.BucketPolicy;

  constructor(
    name: string,
    args: BucketComponentArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("onex:infra:bucket", name, {}, opts);

    this.bucket = new aws.s3.BucketV2(
      args.bucketName,
      {
        bucket: args.bucketName,
        tags: {
          Name: args.bucketName,
          Environment: args.environment,
        },
      },
      { parent: this }
    );

    // Configure public access block settings to allow public policies
    const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock(
      `${name}-public-access-block`,
      {
        bucket: this.bucket.id,
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      { parent: this }
    );

    // Add a bucket policy that allows public read access
    this.bucketPolicy = new aws.s3.BucketPolicy(
      `${name}-bucket-policy`,
      {
        bucket: this.bucket.id,
        policy: this.bucket.bucket.apply((bucketName) =>
          JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: "*",
                Action: ["s3:GetObject"],
                Resource: [`arn:aws:s3:::${bucketName}/*`],
              },
            ],
          })
        ),
      },
      { parent: this, dependsOn: [bucketPublicAccessBlock] }
    );

    this.registerOutputs({
      bucketName: this.bucket.bucket,
    });
  }
}
