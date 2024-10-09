import * as pulumi from "@pulumi/pulumi";

export const getIp = async (): Promise<pulumi.Output<string>> => {
  const response: Response = await fetch("https://api.ipify.org?format=json", {
    method: "GET",
  });

  const data: { ip: string } = (await response.json()) as { ip: string };
  const currentIp = data.ip;

  return pulumi.output(currentIp);
};
