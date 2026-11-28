import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { activateSession, deactivateSession, isSessionActive } from "./session-store";

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
  const now = Math.floor(Date.now() / 1000);
  const payload = (now + sessionDuration) + "." + randomBytes(24).toString("base64url");
  activateSession(payload, now);
  return payload + "." + signature(payload, secret);
}

function verifiedSessionId(token: string | undefined) {
  const secret = credentials()?.secret;
  if (!secret || !token || !/^\d{10}\.[A-Za-z0-9_-]{32}\.[A-Za-z0-9_-]{43}$/.test(token)) return;
  const [expiry, nonce, signed] = token.split(".");
  const id = expiry + "." + nonce;
  if (Number(expiry) <= Date.now() / 1000) return;
  if (timingSafeEqual(Buffer.from(signed), Buffer.from(signature(id, secret)))) return id;
}

export function validSession(token: string | undefined) {
  const id = verifiedSessionId(token);
  return id !== undefined && isSessionActive(id);
}

export function revokeSession(token: string | undefined) {
  const id = verifiedSessionId(token);
  if (id !== undefined) deactivateSession(id);
}
