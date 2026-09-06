import fs from "fs/promises";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";

import {
  ACCESS_COOKIE,
  DOCUMENTS,
  DOCUMENTS_DIR,
  isAccessTokenValid,
  isDocumentId,
  isGateBypassable,
} from "../../../lib/documents";

/** Serves a gated PDF from outside public/, once the caller has cleared the gate. */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Never let a CDN hold a copy of something that is access controlled.
  response.setHeader("Cache-Control", "private, no-store, max-age=0");
  response.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  const { doc } = request.query;

  if (!isDocumentId(doc)) {
    return response.status(404).json({ error: "No such document." });
  }

  const allowed =
    isAccessTokenValid(request.cookies[ACCESS_COOKIE]) || isGateBypassable();

  if (!allowed) {
    return response
      .status(403)
      .json({ error: "Clear the check at /resume first." });
  }

  const entry = DOCUMENTS[doc];

  try {
    const file = await fs.readFile(path.join(DOCUMENTS_DIR, entry.file));

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Length", file.length);
    response.setHeader(
      "Content-Disposition",
      `inline; filename="${entry.label}"`,
    );

    return response.status(200).send(file);
  } catch (error) {
    console.error(`Could not read ${entry.file}:`, error);

    return response.status(500).json({ error: "The file could not be read." });
  }
}
