import type { CSSProperties } from "react";

import Image from "next/image";

import { SiGithub } from "../Misc/Icons.collection";
import { site } from "../../lib/site";

/** One staggered entrance on load. Nothing here animates again on scroll. */
const settle = (delay: number) =>
  ({ "--settle-delay": `${delay}ms` }) as CSSProperties;

const Hero = () => {
  return (
    <section
      id="top"
      className="grid gap-x-10 gap-y-6 pt-10 pb-20 sm:pt-16 sm:pb-28 md:grid-cols-[7rem_minmax(0,1fr)]"
    >
      <div
        className="settle flex items-baseline gap-3 md:block"
        style={settle(0)}
      >
        <p className="label text-signal">00</p>
        <p className="label text-ink-faint md:mt-2">Nek</p>
      </div>

      <div className="min-w-0">
        <p
          className="settle label flex items-center gap-2.5 text-ink-faint"
          style={settle(70)}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 bg-signal"
          />
          Open to internships
        </p>

        <p className="settle mt-6 text-base text-ink-soft" style={settle(110)}>
          Hey, I&apos;m Cardin.
        </p>

        <h1
          className="settle mt-2 max-w-[15ch] text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink"
          style={settle(150)}
        >
          I build backends, then take them apart.
        </h1>

        <div
          className="settle mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_13rem]"
          style={settle(230)}
        >
          <div className="min-w-0">
            <p className="max-w-measure text-[1.0625rem] leading-[1.7] text-ink-soft">
              Backend developer and cybersecurity student in {site.location}.
              Online I go by{" "}
              <span className="font-medium text-ink">&ldquo;Nek&rdquo;</span>,
              which is what most people who know me from the internet still call
              me.
            </p>

            <p className="mt-5 max-w-measure text-[0.9375rem] leading-[1.7]">
              I write mostly Python and TypeScript, keep a few Linux boxes
              alive, and spend my spare hours on penetration testing and
              forensics. Right now I&apos;m looking for an internship where I
              can do more of that.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="label bg-ink px-5 py-3 text-paper transition-colors hover:bg-signal active:translate-y-px"
              >
                Email me
              </a>

              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
              >
                Resume
              </a>

              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label ml-1 inline-flex items-center gap-2 text-ink-faint underline decoration-rule underline-offset-[6px] transition-colors hover:text-signal hover:decoration-signal"
              >
                <SiGithub aria-hidden="true" className="text-sm" />
                Ne-k
              </a>
            </div>
          </div>

          <figure className="w-40 shrink-0 lg:w-full">
            <div className="relative aspect-square border border-rule bg-paper-sunk">
              <Image
                src="/assests/avatar.png"
                alt="Portrait of Cardin Nguyen"
                fill
                sizes="(min-width: 1024px) 208px, 160px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="label mt-3 text-ink-faint">
              Fig. 00 — Cardin Nguyen
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
