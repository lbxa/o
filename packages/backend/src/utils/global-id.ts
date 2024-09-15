export type EntityType = "Community" | "User" | "Post";

export function encodeGlobalId(type: EntityType, id: number): string {
  return Buffer.from(`${type}:${id}`).toString("base64");
}

export function decodeGlobalId(globalId: string): {
  type: EntityType;
  id: number;
} {
  const decoded = Buffer.from(globalId, "base64").toString("utf-8");
  const [type, id] = decoded.split(":");
  return {
    type: type as EntityType,
    id: parseInt(id, 10),
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
