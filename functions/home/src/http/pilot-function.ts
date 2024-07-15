/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from "firebase-admin";
import type { Request } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { HTTP_OPTS } from "./options";

interface PilotUser {
  fullName: string;
  email: string;
  message?: string;
}

const isPilotUser = (body: any): body is PilotUser => {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof body.fullName === 'string' &&
    typeof body.email === 'string' &&
    (typeof body.message === 'undefined' || typeof body.message === 'string')
  );
};


export const addToPilot = onRequest(HTTP_OPTS, async (req: Request, res): Promise<void> => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  if (!req.body) {
    res.status(400).send("Request is empty");
    return;
  }

  if (!isPilotUser(req.body)) {
    res.status(400).send("Fields are missing");
    return;
  }

  try {
    await admin
      .firestore()
      .doc(`pilot_users/${req.body.email.trim()}`)
      .set({ ...req.body });
    res.status(200).send(`${req.body.email.trim()} added to the pilot`);
  } catch (error) {
    logger.error("Error adding document: ", error);
    res.status(500).send("Internal Server Error");
  }
});