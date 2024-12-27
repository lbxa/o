import type { EntityType } from "@/entity";

import {
  decodeGlobalId,
  encodeGlobalId,
  validateAndDecodeGlobalId,
} from "./global-id";

describe("Global ID Encoding and Decoding", () => {
  const entityTypes: EntityType[] = ["Community", "User"];

  test("encodeGlobalId should encode correctly", () => {
    entityTypes.forEach((type) => {
      const id = 123;
      const globalId = encodeGlobalId(type, id);
      const expected = Buffer.from(`${type}:${id}`).toString("base64");
      expect(globalId).toBe(expected);
    });
  });

  test("decodeGlobalId should decode correctly", () => {
    entityTypes.forEach((type) => {
      const id = 456;
      const globalId = encodeGlobalId(type, id);
      const decoded = decodeGlobalId(globalId);
      expect(decoded).toEqual({ type, id });
    });
  });

  test("decodeGlobalId should throw an error for invalid base64 string", () => {
    const invalidGlobalId = "invalid_base64_string!";
    expect(() =>
      validateAndDecodeGlobalId(invalidGlobalId, "Community")
    ).toThrow();
  });

  test("decodeGlobalId should throw an error for malformed decoded string", () => {
    const malformedGlobalId = Buffer.from("InvalidString").toString("base64");
    expect(() =>
      validateAndDecodeGlobalId(malformedGlobalId, "Community")
    ).toThrow();
  });

  test("validateAndDecodeGlobalId should return id for valid type", () => {
    entityTypes.forEach((type) => {
      const id = 789;
      const globalId = encodeGlobalId(type, id);
      const validatedId = validateAndDecodeGlobalId(globalId, type);
      expect(validatedId).toBe(id);
    });
  });

  test("validateAndDecodeGlobalId should throw error for invalid type", () => {
    const correctType: EntityType = "User";
    const incorrectType: EntityType = "Community";
    const id = 101112;
    const globalId = encodeGlobalId(correctType, id);
    expect(() => validateAndDecodeGlobalId(globalId, incorrectType)).toThrow(
      `Invalid ID type. Expected ${incorrectType}, got ${correctType}`
    );
  });

  test("encodeGlobalId should handle zero and negative IDs", () => {
    const testCases = [0, -1, -999];
    testCases.forEach((id) => {
      const type: EntityType = "User";
      const globalId = encodeGlobalId(type, id);
      const decoded = decodeGlobalId(globalId);
      expect(decoded).toEqual({ type, id });
    });
  });

  test("encodeGlobalId should handle large IDs", () => {
    const type: EntityType = "Community";
    const id = Number.MAX_SAFE_INTEGER;
    const globalId = encodeGlobalId(type, id);
    const decoded = decodeGlobalId(globalId);
    expect(decoded).toEqual({ type, id });
  });

  test("decodeGlobalId should handle IDs as strings in encoded data", () => {
    const type: EntityType = "User";
    const id = "12345"; // ID as string
    const globalId = Buffer.from(`${type}:${id}`).toString("base64");
    const decoded = decodeGlobalId(globalId);
    expect(decoded).toEqual({ type, id: Number(id) });
  });

  test("decodeGlobalId should throw error when decoded ID is NaN", () => {
    const globalId = Buffer.from("User:not_a_number").toString("base64");
    expect(() => decodeGlobalId(globalId)).toThrow(
      "Invalid ID. Expected a number."
    );
  });
});
