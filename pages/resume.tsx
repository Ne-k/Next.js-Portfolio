import fs from "fs/promises";
import path from "path";

import { useCallback, useRef, useState } from "react";

import type { GetServerSideProps, NextPage } from "next";
import Script from "next/script";

import { Seo } from "../components/Misc/Seo.component";
import { Sheet } from "../components/Misc/Sheet.component";
import {
  DOCUMENTS,
  DOCUMENTS_DIR,
  type DocumentId,
  isGateBypassable,
} from "../lib/documents";

type Listing = {
  id: DocumentId;
  label: string;
  note: string;
  size: string;
};

type ResumePageProps = {
  siteKey: string | null;
  bypass: boolean;
  documents: Listing[];
};

type Status = "idle" | "verifying" | "ready" | "error";

const MESSAGES: Record<Status, string> = {
  idle: "Awaiting check",
  verifying: "Verifying",
  ready: "Cleared",
  error: "Check failed, try again",
};

const ResumePage: NextPage<ResumePageProps> = ({
  siteKey,
  bypass,
  documents,
}) => {
  const [status, setStatus] = useState<Status>(bypass ? "ready" : "idle");
  const widget = useRef<HTMLDivElement>(null);

  const mountWidget = useCallback(() => {
    if (!siteKey || !widget.current || !window.turnstile) return;

    window.turnstile.render(widget.current, {
      sitekey: siteKey,
      // Follow whatever the reader picked, not just their system setting.
      theme:
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark"
          | null) ?? "auto",
      callback: async (token) => {
        setStatus("verifying");

        try {
          const response = await fetch("/api/turnstile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          setStatus(response.ok ? "ready" : "error");
        } catch {
          setStatus("error");
        }
      },
      "error-callback": () => setStatus("error"),
      "expired-callback": () => setStatus("idle"),
    });
  }, [siteKey]);

  const cleared = status === "ready";

  return (
    <>
      <Seo
        title="Documents | Cardin Nguyen"
        description="Resume and references for Cardin Nguyen, behind a quick bot check."
        url="https://cardin.nguyen.ink/resume"
        noIndex
      />

      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={mountWidget}
        />
      ) : null}

      <Sheet masthead="cardin.nguyen.ink / documents">
        <h1 className="max-w-[16ch] text-[clamp(2.25rem,7vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink">
          Resume and references.
        </h1>

        <p className="mt-6 max-w-measure text-[1.0625rem] leading-[1.7] text-ink-soft">
          Both files carry my phone number, and the reference sheet carries
          other people&apos;s. One quick check keeps them away from the scrapers
          that crawl every PDF they can reach.
        </p>

        <div className="mt-10">
          <p className="label text-ink-faint">
            Status{" "}
            <span className={cleared ? "text-signal" : "text-ink"}>
              {bypass ? "Open, no keys configured" : MESSAGES[status]}
            </span>
          </p>

          {!bypass && siteKey ? <div ref={widget} className="mt-4" /> : null}

          {!bypass && !siteKey ? (
            <p className="mt-4 max-w-measure text-[0.9375rem] leading-[1.7]">
              This deploy is missing its Turnstile keys, so the documents stay
              locked. Mail me and I will send them over.
            </p>
          ) : null}
        </div>

        <ul className="mt-12 border-b border-rule-soft">
          <li className="label flex items-baseline gap-4 border-b border-ink pb-3 text-ink-faint">
            <span className="flex-1">Document</span>
            <span className="w-16 text-right">Size</span>
          </li>

          {documents.map((entry) => {
            const row = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="label block text-ink">{entry.label}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-[1.6]">
                    {entry.note}
                  </span>
                </span>
                <span className="label w-16 text-right">{entry.size}</span>
              </>
            );

            return (
              <li key={entry.id} className="border-t border-rule-soft">
                {cleared ? (
                  <a
                    href={`/api/documents/${entry.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-4 flex items-baseline gap-4 px-4 py-5 transition-colors hover:bg-paper-sunk"
                  >
                    {row}
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    className="-mx-4 flex items-baseline gap-4 px-4 py-5 opacity-45"
                  >
                    {row}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Sheet>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ResumePageProps
> = async () => {
  const documents = await Promise.all(
    (Object.keys(DOCUMENTS) as DocumentId[]).map(async (id) => {
      const entry = DOCUMENTS[id];
      let size = "--";

      try {
        const stat = await fs.stat(path.join(DOCUMENTS_DIR, entry.file));
        size = `${Math.round(stat.size / 1024)} KB`;
      } catch {
        // A missing file should grey the row out, not break the page.
      }

      return { id, label: entry.label, note: entry.note, size };
    }),
  );

  return {
    props: {
      siteKey: process.env.CF_KEY ?? null,
      bypass: isGateBypassable(),
      documents,
    },
  };
};

export default ResumePage;
