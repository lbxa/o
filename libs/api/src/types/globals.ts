import type { Request } from "express";

export interface GqlContext {
  req: Request;
}
