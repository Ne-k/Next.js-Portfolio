import type { ReactNode } from "react";

type SheetProps = {
  /** Mono line ruled off at the top of the page, like a document header. */
  masthead: string;
  /** "auto" follows the system theme. Read by the :has() rule in globals.css. */
  theme?: "paper" | "auto";
  children: ReactNode;
};

/** The single-screen page frame shared by the landing, Dylan, and 404 routes. */
const Sheet = ({ masthead, theme = "paper", children }: SheetProps) => {
  return (
    <div
      className={`bg-graph min-h-screen ${theme === "auto" ? "theme-auto" : ""}`.trim()}
    >
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8">
        <p className="label border-b border-ink pb-3 text-ink">{masthead}</p>

        <div className="flex flex-1 flex-col justify-center py-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Sheet };
