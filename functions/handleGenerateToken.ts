import crypto from "node:crypto";

export function generateUniqueToken(limit : number): string {
  return crypto.randomBytes(limit).toString("base64url");
}
