/**
 * Maps a string value to an enum value.
 * @param enumType - The enum type.
 * @param value - The string value to map to the enum.
 * @returns The enum value.
 * @throws An error if the string value is not a valid enum value.
 */
export const mapToEnum = <T extends Record<string, string>>(
  enumType: T,
  value: string
): T[keyof T] => {
  if (Object.values(enumType).includes(value)) {
    return value as T[keyof T];
  }
  throw new Error(`Invalid enum value: ${value}`);
};
