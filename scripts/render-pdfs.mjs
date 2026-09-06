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
