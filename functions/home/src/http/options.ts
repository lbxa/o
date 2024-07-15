import type { HttpsOptions } from "firebase-functions/v2/https";

const origins = [
  "https://onex.social",
  // "http://localhost:5173" REMOVED FOR SECURITY
];

export const HTTP_OPTS: HttpsOptions = {
  region: "australia-southeast1",
  cors: origins 
} as const;