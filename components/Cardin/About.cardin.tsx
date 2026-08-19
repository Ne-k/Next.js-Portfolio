import { Reveal } from "../Misc/Reveal.component";
import { Section } from "../Misc/Section.component";

const facts = [
  {
    label: "Studying",
    value: "Computer science, cybersecurity track",
    detail: "Portland Community College now, Oregon State after that",
  },
  {
    label: "Working",
    value: "Instructor at Coding With Kids",
    detail: "Teaching programming to students who are quicker than I expect",
  },
  {
    label: "Volunteering",
    value: "AV crew at FIRST Robotics events",
    detail: "Same competitions I used to compete in, different side of the glass",
  },
  {
    label: "Shooting",
    value: "Sony A7R IV and A7 IV",
    detail: "Stills, video, and the occasional sports sideline",
  },
];

const About = () => {
  return (
    <Section id="about" index="01" title="About me">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal className="space-y-4 text-base leading-7 text-slate-400">
          <p>
            I got into this through robotics. In 2021 I joined FRC Team 7034 and FTC Team 10332 as a
            software developer, which in practice meant debugging autonomous routines at 11pm the
            night before a match with the whole team watching. Four seasons of that taught me more
            about shipping under pressure than any class has.
          </p>
          <p>
            Somewhere along the way I got curious about the other direction: not just making a system
            work, but figuring out where it gives. That curiosity is why I&apos;m on the cybersecurity
            track now, working through penetration testing and digital forensics.
          </p>
          <p>
            The rest of my time goes to backend projects, a couple of Linux servers I keep running
            for no good reason, and teaching kids to code. One of my old Discord bots quietly reached
            about six thousand servers before I archived it, which is still the strangest thing on my
            GitHub.
          </p>
          <p>
            Off the clock I&apos;m usually behind a camera. I shot video professionally for
            IConnect007 for two years, and I still take the A7R IV out most weekends.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="divide-y divide-white/8 border-y border-white/8">
            {facts.map((fact) => (
              <div key={fact.label} className="py-4">
                <dt className="font-jost text-sm text-accent-400">{fact.label}</dt>
                <dd className="mt-1 font-jost text-base text-white">{fact.value}</dd>
                <dd className="mt-0.5 text-sm leading-6 text-slate-400">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
};

export default About;
