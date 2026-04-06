export type PdfDocumentKey = "resume" | "references";

export type PdfDocumentConfig = {
  description: string;
  filename: string;
  sourcePath: string;
  title: string;
};

export const PDF_DOCUMENTS: Record<PdfDocumentKey, PdfDocumentConfig> = {
  resume: {
    description: "Cardin Nguyen's resume rendered directly from the HTML source file.",
    filename: "Cardin-Nguyen-Resume.pdf",
    sourcePath: "/CN_Resume.html",
    title: "Cardin Nguyen - Resume",
  },
  references: {
    description: "Cardin Nguyen's professional references rendered directly from the HTML source file.",
    filename: "Cardin-Nguyen-References.pdf",
    sourcePath: "/CN_References.html",
    title: "Cardin Nguyen - Professional References",
  },
};

export const PDF_DOCUMENT_KEYS = Object.keys(PDF_DOCUMENTS) as PdfDocumentKey[];

export function isPdfDocumentKey(value: string): value is PdfDocumentKey {
  return value in PDF_DOCUMENTS;
}