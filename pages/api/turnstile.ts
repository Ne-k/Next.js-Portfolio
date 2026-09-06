import type { NextApiRequest, NextApiResponse } from "next";

import {
  ACCESS_COOKIE,
  isTurnstileConfigured,
  issueAccessToken,
  verifyTurnstileToken,
} from "../../lib/documents";

type Result = { ok: true } | { ok: false; error: string };

/** Trades a solved Turnstile challenge for a short-lived access cookie. */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Result>,
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");

    return response.status(405).json({ ok: false, error: "Use POST." });
  }

  if (!isTurnstileConfigured()) {
    return response
      .status(503)
      .json({
        ok: false,
        error: "Turnstile is not configured on this deploy.",
      });
  }

  const token =
    typeof request.body?.token === "string" ? request.body.token : "";

  if (!token) {
    return response
      .status(400)
      .json({ ok: false, error: "No challenge token was sent." });
  }

  const forwarded =
    request.headers["cf-connecting-ip"] ?? request.headers["x-forwarded-for"];
  const remoteIp =
    String(forwarded ?? "")
      .split(",")[0]
      .trim() || undefined;

  if (!(await verifyTurnstileToken(token, remoteIp))) {
    return response
      .status(403)
      .json({ ok: false, error: "That challenge could not be verified." });
  }

  const { value, maxAge } = issueAccessToken();

  response.setHeader(
    "Set-Cookie",
    [
      `${ACCESS_COOKIE}=${value}`,
      "Path=/",
      `Max-Age=${maxAge}`,
      "HttpOnly",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; "),
  );

  return response.status(200).json({ ok: true });
}
