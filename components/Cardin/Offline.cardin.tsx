import { FaInstagram, FiCamera, HiArrowUpRight } from "../Misc/Icons.collection";
import NowPlaying from "./NowPlaying.cardin";
import { Reveal } from "../Misc/Reveal.component";
import { Section } from "../Misc/Section.component";
import { site } from "../../lib/site";

const Offline = () => {
  return (
    <Section
      id="offline"
      index="04"
      title="When I'm not writing code"
      description="The parts of my life that do not compile."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <FiCamera aria-hidden="true" className="text-xl text-accent-400" />
            <h3 className="font-jost text-lg font-semibold text-white">Behind a camera</h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            I shoot stills on a Sony A7R IV and video on an A7 IV. For two years that meant running
            multi-camera setups and live switching for IConnect007 at trade shows in Anaheim. These
            days it is mostly whatever catches my eye on a weekend, plus the occasional sports
            sideline.
          </p>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 font-jost text-sm text-slate-300 transition-colors hover:text-accent-300"
          >
            <FaInstagram aria-hidden="true" className="text-base" />
            See what I have been shooting
            <HiArrowUpRight
              aria-hidden="true"
              className="text-xs opacity-60 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={80} className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
          <h3 className="font-jost text-lg font-semibold text-white">On repeat</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Nothing gets written without something playing. This pulls live from my Spotify, so it is
            genuinely whatever is on right now.
          </p>

          <div className="mt-5 rounded-lg border border-white/8 bg-white/[0.02] p-4">
            <NowPlaying />
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default Offline;
