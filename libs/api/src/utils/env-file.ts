export const envFile = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return ".env.local";
    case "development":
      return ".env.dev";
    default:
      return ".env.local";
  }
};
