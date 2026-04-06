import fs from "fs/promises";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

import { isPdfDocumentKey, PDF_DOCUMENTS } from "../../../lib/pdf-documents";

async function resolveBrowserLaunchOptions() {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  if (isServerless) {
    return {
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true as const,
    };
  }

  return {
    headless: true as const,
  };
}

async function generatePdf(documentKey: keyof typeof PDF_DOCUMENTS) {
  const sourcePath = path.join(
    process.cwd(),
    "public",
    PDF_DOCUMENTS[documentKey].sourcePath.replace(/^\//, "")
  );
  const html = await fs.readFile(sourcePath, "utf8");

  const browser = isServerlessRuntime()
    ? await puppeteerCore.launch(await resolveBrowserLaunchOptions())
    : await puppeteer.launch(await resolveBrowserLaunchOptions());

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.emulateMediaType("print");

    const pdfFormat = documentKey === "resume" ? "a4" : "letter";

    return await page.pdf({
      format: pdfFormat,
      margin: {
        top: "0.3in",
        right: "0.3in",
        bottom: "0.3in",
        left: "0.3in",
      },
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const documentParam = req.query.document;
  const documentKey = Array.isArray(documentParam) ? documentParam[0] : documentParam;

  if (!documentKey || !isPdfDocumentKey(documentKey)) {
    return res.status(404).json({ error: "Document not found." });
  }

  try {
    const pdf = await generatePdf(documentKey);
    const documentConfig = PDF_DOCUMENTS[documentKey];
    const shouldDownload = req.query.download === "1";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `${shouldDownload ? "attachment" : "inline"}; filename="${documentConfig.filename}"`
    );
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800"
    );

    return res.status(200).end(pdf);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unable to generate the PDF.",
    });
  }
}

function isServerlessRuntime() {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}