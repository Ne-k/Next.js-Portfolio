import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  /** Two-digit field number rendered in the gutter, e.g. "02". */
  index: string;
  /** Optional second gutter line: a count, a source, a caveat. */
  meta?: string;
  description?: string;
  children: ReactNode;
};

/** A numbered field of the datasheet: mono metadata in the gutter, content beside it. */
const Section = ({
  id,
  title,
  index,
  meta,
  description,
  children,
}: SectionProps) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="grid gap-x-10 gap-y-6 border-t border-ink pt-6 pb-20 md:grid-cols-[7rem_minmax(0,1fr)] sm:pb-28"
    >
      <div className="flex items-baseline gap-3 md:sticky md:top-24 md:block md:self-start">
        <p className="label text-signal">{index}</p>
        {meta ? <p className="label text-ink-faint md:mt-2">{meta}</p> : null}
      </div>

      <div>
        <h2
          id={`${id}-heading`}
          className="max-w-measure text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-balance text-ink sm:text-[2.125rem]"
        >
          {title}
        </h2>

        {description ? (
          <p className="mt-4 max-w-measure text-[0.9375rem] leading-[1.7]">
            {description}
          </p>
        ) : null}

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};

export { Section };
