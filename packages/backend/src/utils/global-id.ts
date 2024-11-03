// import type { ExecutionContext } from "@nestjs/common";
// import { createParamDecorator } from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";

// export const DecodeGlobalId = createParamDecorator(
//   (data: string, ctx: ExecutionContext) => {
//     const gqlContext = GqlExecutionContext.create(ctx);
//     const args = gqlContext.getArgs<Record<string, unknown>>();
//     const globalId = args[data];

//     if (!globalId) {
//       throw new Error(`Global ID not found in arguments for key: ${data}`);
//     }

//     try {
//       const id = validateAndDecodeGlobalId(globalId, entityType);
//       return Number(id);
//     } catch {
//       throw new Error(`Invalid global ID: ${globalId}`);
//     }
//   }
// );

type EntityIdentifiers =
  | "Community"
  | "User"
  | "Challenge"
  | "ChallengeActivity";

type EntitySecondaryIdentifiers = "Invitation" | "Result" | "Membership";
export type EntityType =
  | EntityIdentifiers
  | `${EntityIdentifiers}${EntitySecondaryIdentifiers}`;

export function encodeGlobalId(type: EntityType, id: number): string {
  return Buffer.from(`${type}:${id}`, "utf8").toString("base64");
}

export function decodeGlobalId(globalId: string): {
  type: EntityType;
  id: number;
} {
  const decoded = Buffer.from(globalId, "base64").toString("utf-8");
  const [type, id] = decoded.split(":");

  if (isNaN(Number(id))) {
    throw new Error("Invalid ID. Expected a number.");
  }

  return {
    type: type as EntityType,
    id: Number(id),
  };
}

export function validateAndDecodeGlobalId(
  globalId: string,
  expectedType: EntityType
): number {
  const { type, id } = decodeGlobalId(globalId);
  if (type !== expectedType) {
    throw new Error(`Invalid ID type. Expected ${expectedType}, got ${type}`);
  }
  return id;
}
