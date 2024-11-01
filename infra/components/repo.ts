import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

export class Repo extends pulumi.ComponentResource {
  public readonly repo: awsx.ecr.Repository;

  constructor(name: string, opts: pulumi.ComponentResourceOptions = {}) {
    super("onex:infra:repo", name, {}, opts);

    this.repo = new awsx.ecr.Repository(
      `${name}-repo`,
      {
        forceDelete: true,
        lifecyclePolicy: {
          rules: [
            {
              tagStatus: awsx.ecr.LifecycleTagStatus.Untagged,
              description: "Expire images older than 7 days",
              maximumAgeLimit: 7,
              maximumNumberOfImages: 10,
            },
          ],
        },
      },
      { parent: this }
    );
  }
}
