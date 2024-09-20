export type EntityType = "Community" | "User";

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
