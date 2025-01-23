import { mapToEnum } from "./map-to-enum";

enum SampleEnum {
  OPTION_ONE = "OPTION_ONE",
  OPTION_TWO = "OPTION_TWO",
}

describe("mapToEnum", () => {
  it("should map a valid string to the corresponding enum value", () => {
    expect(mapToEnum(SampleEnum, "OPTION_ONE")).toBe(SampleEnum.OPTION_ONE);
    expect(mapToEnum(SampleEnum, "OPTION_TWO")).toBe(SampleEnum.OPTION_TWO);
  });

  it("should throw an error for an invalid enum value", () => {
    expect(() => mapToEnum(SampleEnum, "INVALID_OPTION")).toThrow(
      "Invalid enum value: INVALID_OPTION"
    );
  });

  it("should throw an error for an empty string", () => {
    expect(() => mapToEnum(SampleEnum, "")).toThrowError(
      "Invalid enum value: "
    );
  });

  it("should throw an error for a null value", () => {
    expect(() => mapToEnum(SampleEnum, null as unknown as string)).toThrow(
      "Invalid enum value: null"
    );
  });

  it("should throw an error for an undefined value", () => {
    expect(() =>
      mapToEnum(SampleEnum, undefined as unknown as string)
    ).toThrowError("Invalid enum value: undefined");
  });
});
