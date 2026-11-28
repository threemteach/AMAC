import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const sessionCookie = "amac-admin";
export const sessionDuration = 8 * 60 * 60;

function credentials() {
  const password = process.env.AMAC_ADMIN_PASSWORD;
  if (password && password.length >= 16) return { password, secret: password };

  const devSecret = process.env.AMAC_ADMIN_DEV_SESSION_SECRET;
  if (process.env.NODE_ENV === "development" && password && devSecret && devSecret.length >= 32) {
    return { password, secret: devSecret };
  }
}

export function isAdminConfigured() {
  return Boolean(credentials());
}

export function validPassword(candidate: unknown) {
  const expected = credentials()?.password;
  if (!expected || typeof candidate !== "string" || candidate.length > 512) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(candidate), digest(expected));
}

function signature(value: string, secret: string) {
  return createHmac("sha256", secret).update("amac-admin-session:" + value).digest("base64url");
}

export function issueSession() {
  const secret = credentials()?.secret;
  if (!secret) throw new Error("Admin is disabled.");
  const payload = (Math.floor(Date.now() / 1000) + sessionDuration) + "." + randomBytes(24).toString("base64url");
  return payload + "." + signature(payload, secret);
}

export function validSession(token: string | undefined) {
  const secret = credentials()?.secret;
  if (!secret || !token || !/^\d{10}\.[A-Za-z0-9_-]{32}\.[A-Za-z0-9_-]{43}$/.test(token)) return false;
  const [expiry, nonce, signed] = token.split(".");
  const expected = signature(expiry + "." + nonce, secret);
  return Number(expiry) > Date.now() / 1000 && timingSafeEqual(Buffer.from(signed), Buffer.from(expected));
}
