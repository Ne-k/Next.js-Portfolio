import type { ReactNode } from "react";

import { Reveal } from "./Reveal.component";

type SectionProps = {
  id: string;
  title: string;
  /** Small label rendered above the heading, e.g. "02". */
  index?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Section = ({ id, title, index, description, children, className = "" }: SectionProps) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-white/8 py-14 sm:py-20 ${className}`.trim()}
    >
      <Reveal className="max-w-2xl">
        <div className="flex items-baseline gap-3">
          {index ? (
            <span aria-hidden="true" className="font-jost text-sm font-medium text-accent-400">
              {index}
            </span>
          ) : null}
          <h2 id={`${id}-heading`} className="font-jost text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        </div>

        {description ? (
          <p className="mt-3 text-base leading-7 text-slate-400">{description}</p>
        ) : null}
      </Reveal>

      <div className="mt-8 sm:mt-12">{children}</div>
    </section>
  );
};

export { Section };
