import crypto from "crypto";
import path from "path";

/**
 * The gated documents. Requests address them by key, never by filename, so a
 * path cannot be traversed in through the URL.
 */
export const DOCUMENTS = {
  resume: {
    file: "CN_Resume.pdf",
    label: "CN_Resume.pdf",
    title: "Résumé",
    note: "Two decades of nothing, one page of something.",
  },
  references: {
    file: "CN_References.pdf",
    label: "CN_References.pdf",
    title: "References",
    note: "Names, roles, and how to reach them.",
  },
} as const;

export type DocumentId = keyof typeof DOCUMENTS;

export const isDocumentId = (value: unknown): value is DocumentId =>
  typeof value === "string" && Object.hasOwn(DOCUMENTS, value);

/** Outside public/, so Next never serves these as static files. */
export const DOCUMENTS_DIR = path.join(process.cwd(), "documents");

export const ACCESS_COOKIE = "doc_access";

const TTL_SECONDS = 30 * 60;

export const isTurnstileConfigured = () =>
  Boolean(process.env.CF_KEY && process.env.CF_SECRET);

/**
 * Without keys the gate cannot work at all. Locally that should not stand
 * between you and your own files, but in production a missing secret is a
 * misconfiguration, and a security control that fails open is not a control.
 */
export const isGateBypassable = () =>
  !isTurnstileConfigured() && process.env.NODE_ENV !== "production";

const signingKey = () => process.env.CF_SECRET ?? "";

const sign = (payload: string) =>
  crypto.createHmac("sha256", signingKey()).update(payload).digest("hex");

/** `<expires>.<hmac>`. Nothing about the visitor is stored in it. */
export function issueAccessToken(): { value: string; maxAge: number } {
  const expires = Date.now() + TTL_SECONDS * 1000;

  return { value: `${expires}.${sign(String(expires))}`, maxAge: TTL_SECONDS };
}

export function isAccessTokenValid(raw: string | undefined): boolean {
  if (!raw || !signingKey()) return false;

  const separator = raw.lastIndexOf(".");
  if (separator < 1) return false;

  const expires = raw.slice(0, separator);
  const provided = Buffer.from(raw.slice(separator + 1), "utf8");
  const expected = Buffer.from(sign(expires), "utf8");

  if (provided.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(provided, expected)) return false;

  return Number(expires) > Date.now();
}

type SiteVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

/** Exchanges a widget token with Cloudflare. A token is only good once. */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret: process.env.CF_SECRET ?? "",
    response: token,
  });

  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );

    if (!response.ok) return false;

    const result = (await response.json()) as SiteVerifyResponse;

    if (!result.success) {
      console.error("Turnstile rejected a token:", result["error-codes"]);
    }

    return result.success;
  } catch (error) {
    console.error("Could not reach Turnstile siteverify:", error);

    return false;
  }
}
