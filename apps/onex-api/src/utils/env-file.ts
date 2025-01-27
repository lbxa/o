export const envFile = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return ".env.local";
    case "development":
      return ".env.development";
    case "production":
      return ".env.production";
    case "test":
      return ".env.test";
    default:
      return ".env.local";
  }
};
