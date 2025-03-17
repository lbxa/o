export const useApiEndpoint = (): {
  REST_API_URL: string;
  GQL_API_URL: string;
} => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }
  return {
    REST_API_URL: `${API_URL}/api` as const,
    GQL_API_URL: `${API_URL}/graphql` as const,
  };
};
