// Add utility functions
export const EntityUtils = {
  /**
   * Filters out null values from an object
   * @param input Object to filter
   * @returns New object with null values removed
   */
  filterNullValues<T extends Record<string, unknown>>(
    input: T
  ): {
    [K in keyof T]: Exclude<T[K], null>;
  } {
    return Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== null)
    ) as { [K in keyof T]: Exclude<T[K], null> }; // More precise type assertion
  },
};
