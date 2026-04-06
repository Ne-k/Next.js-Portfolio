import { useEffect, useState } from "react";

import { PDF_DOCUMENTS, type PdfDocumentKey } from "../../lib/pdf-documents";

type PdfDocumentViewerProps = {
  documentKey: PdfDocumentKey;
};

export default function PdfDocumentViewer({ documentKey }: PdfDocumentViewerProps) {
  const documentConfig = PDF_DOCUMENTS[documentKey];
  const pdfUrl = `/api/documents/${documentKey}`;
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let nextBlobUrl: string | null = null;

    setIsPdfLoading(true);
    setLoadError(null);
    setPdfBlobUrl(null);

    async function loadPdf() {
      try {
        const response = await fetch(pdfUrl);

        if (!response.ok) {
          throw new Error(`Unable to load the PDF (${response.status}).`);
        }

        const blob = await response.blob();

        if (!isMounted) {
          return;
        }

        nextBlobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(nextBlobUrl);
        setIsPdfLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLoadError(error instanceof Error ? error.message : "Unable to load the PDF.");
        setIsPdfLoading(false);
      }
    }

    loadPdf();

    return () => {
      isMounted = false;

      if (nextBlobUrl) {
        URL.revokeObjectURL(nextBlobUrl);
      }
    };
  }, [documentKey, pdfUrl]);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 px-4 py-4 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              PDF document
            </p>
            <h1 className="mt-1 text-xl font-semibold text-zinc-950 sm:text-2xl">
              {documentConfig.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Open PDF
            </a>
            <a
              href={`${pdfUrl}?download=1`}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Download
            </a>
          </div>
        </header>

        <div className="relative flex flex-1 bg-zinc-100 overflow-hidden">
          {isPdfLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-6 text-center">
              <p className="max-w-md text-sm font-medium text-zinc-600 sm:text-base">
                Please wait while the {documentKey === "resume" ? "resume" : "document"} is compiling...
              </p>
            </div>
          )}

          {loadError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-6 text-center">
              <p className="max-w-lg text-sm font-medium text-rose-600 sm:text-base">
                {loadError}
              </p>
            </div>
          )}

          <iframe
            title={documentConfig.title}
            src={pdfBlobUrl ?? undefined}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </main>
  );
}