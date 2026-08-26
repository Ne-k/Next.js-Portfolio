import NowPlaying from "./NowPlaying.cardin";
import { Section } from "../Misc/Section.component";
import { site } from "../../lib/site";

const Offline = () => {
  return (
    <Section
      id="offline"
      index="04"
      meta="Off the clock"
      title="When I'm not writing code"
      description="The parts of my life that do not compile."
    >
      <div className="grid gap-x-14 gap-y-12 md:grid-cols-2 md:divide-x md:divide-rule">
        <div className="md:pr-14">
          <h3 className="label border-t border-ink pt-3 text-ink">
            Behind a camera
          </h3>

          <p className="mt-4 text-[0.9375rem] leading-[1.7]">
            I shoot stills on a Sony A7R IV and video on an A7 IV. For two years
            that meant running multi-camera setups and live switching for
            IConnect007 at trade shows in Anaheim. These days it is mostly
            whatever catches my eye on a weekend, plus the occasional sports
            sideline.
          </p>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-6 inline-block text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:text-signal hover:decoration-signal"
          >
            See what I have been shooting
          </a>
        </div>

        <div className="md:pl-14">
          <h3 className="label border-t border-ink pt-3 text-ink">On repeat</h3>

          <p className="mt-4 text-[0.9375rem] leading-[1.7]">
            Nothing gets written without something playing. This pulls live from
            my Spotify, so it is genuinely whatever is on right now.
          </p>

          <div className="mt-6">
            <NowPlaying />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Offline;
