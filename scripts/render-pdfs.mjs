import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

import puppeteer from "puppeteer";

const ROOT_DIR = path.resolve(process.cwd());
const DOCUMENTS_DIR = path.join(ROOT_DIR, "documents");

const DOCUMENTS = [
  {
    source: "CN_Resume.html",
    output: "CN_Resume.pdf",
    format: "A4",
  },
  {
    source: "CN_References.html",
    output: "CN_References.pdf",
    format: "letter",
  },
];

async function renderPdf(page, { source, output, format }) {
  const inputPath = path.join(DOCUMENTS_DIR, source);
  const outputPath = path.join(DOCUMENTS_DIR, output);
  const fileUrl = pathToFileURL(inputPath).toString();

  await page.goto(fileUrl, { waitUntil: "networkidle0" });
  await page.emulateMediaType("print");
  await page.pdf({
    path: outputPath,
    format,
    margin: {
      top: "0.4in",
      right: "0.4in",
      bottom: "0.4in",
      left: "0.3in",
    },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await freezeTimestamps(outputPath);
}

/*
 * Chrome stamps the current time into /CreationDate and /ModDate, which is the
 * only thing that differs between two renders of identical input. Left alone,
 * every render produces a new blob, the pre-push hook sees a change, and asks
 * for a commit it will ask for again next time.
 *
 * The replacement is deliberately the same length as what it overwrites: a PDF
 * xref table stores byte offsets, so changing the size would corrupt the file.
 */
async function freezeTimestamps(outputPath) {
  const EPOCH = "D:20000101000000+00'00'";
  const pdf = await fs.readFile(outputPath, "latin1");
  const frozen = pdf.replace(/D:\d{14}\+00'00'/g, EPOCH);

  await fs.writeFile(outputPath, frozen, "latin1");
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    for (const document of DOCUMENTS) {
      await renderPdf(page, document);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Failed to render PDFs:", error);
  process.exit(1);
});
