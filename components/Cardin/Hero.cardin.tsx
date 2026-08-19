import Image from "next/image";

import { HiArrowUpRight, SiGithub } from "../Misc/Icons.collection";
import { Reveal } from "../Misc/Reveal.component";
import { site } from "../../lib/site";

const Hero = () => {
  return (
    <section id="top" className="py-14 sm:py-20">
      <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-14">
        <Reveal className="min-w-0 flex-1">
          <p className="font-jost text-sm text-accent-400">Hey, I&apos;m Cardin.</p>

          <h1 className="mt-3 font-jost text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            I build backends, then
            <br className="hidden sm:block" /> take them apart.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Backend developer and cybersecurity student in {site.location}. Online I go by{" "}
            <span className="text-white">&ldquo;Nek&rdquo;</span>, which is what most people who know
            me from the internet still call me.
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
            I write mostly Python and TypeScript, keep a few Linux boxes alive, and spend my spare
            hours on penetration testing and forensics. Right now I&apos;m looking for an internship
            where I can do more of that.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg bg-white px-5 py-2.5 font-jost text-sm font-semibold text-ink-950 transition-colors hover:bg-slate-200"
            >
              Email me
            </a>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-5 py-2.5 font-jost text-sm font-medium text-white transition-colors hover:border-accent-400/50 hover:bg-white/5"
            >
              Resume
              <HiArrowUpRight aria-hidden="true" className="text-xs opacity-60" />
            </a>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-2.5 font-jost text-sm text-slate-400 transition-colors hover:text-white"
            >
              <SiGithub aria-hidden="true" className="text-base" />
              Ne-k
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="shrink-0">
          <div className="relative">
            {/* The source PNG is already a circle with transparent corners. */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/10 sm:h-44 sm:w-44">
              <Image
                src="/assests/avatar.png"
                alt="Portrait of Cardin Nguyen"
                fill
                sizes="(min-width: 640px) 176px, 112px"
                className="object-cover"
                priority
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 -z-10 hidden rounded-full border border-accent-400/20 sm:block"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
