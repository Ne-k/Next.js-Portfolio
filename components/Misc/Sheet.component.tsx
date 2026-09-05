import type { CSSProperties, ReactNode } from "react";

import { ThemeToggle } from "./ThemeToggle.component";

type SheetProps = {
  /** Mono line ruled off at the top of the page, like a document header. */
  masthead: string;
  children: ReactNode;
};

/** The single-screen page frame shared by the landing, Dylan, and 404 routes. */
const Sheet = ({ masthead, children }: SheetProps) => {
  return (
    <div className="bg-graph min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8">
        <div className="relative pb-3">
          <div className="flex items-center justify-between gap-4">
            <p className="label text-ink">{masthead}</p>
            <ThemeToggle />
          </div>

          <span
            aria-hidden="true"
            className="rule-draw absolute inset-x-0 bottom-0 block h-px bg-ink"
          />
        </div>

        <div
          className="settle flex flex-1 flex-col justify-center py-16"
          style={{ "--settle-delay": "160ms" } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Sheet };
