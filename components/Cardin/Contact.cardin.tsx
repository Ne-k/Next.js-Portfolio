import type { ReactElement } from "react";

import {
  BsSpotify,
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  MdEmail,
  SiGithub,
} from "../Misc/Icons.collection";
import { Section } from "../Misc/Section.component";
import { site } from "../../lib/site";

type Channel = {
  icon: ReactElement;
  label: string;
  handle: string;
  url: string;
};

const channels: Channel[] = [
  {
    icon: <MdEmail />,
    label: "Email",
    handle: site.email,
    url: `mailto:${site.email}`,
  },
  { icon: <SiGithub />, label: "GitHub", handle: "Ne-k", url: site.github },
  {
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    handle: "Cardin Nguyen",
    url: site.linkedin,
  },
  {
    icon: <FaDiscord />,
    label: "Discord",
    handle: "Direct message",
    url: site.discord,
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    handle: "nekk.ng",
    url: site.instagram,
  },
  {
    icon: <BsSpotify />,
    label: "Spotify",
    handle: "What I listen to",
    url: site.spotify,
  },
];

const Contact = () => {
  return (
    <Section
      id="contact"
      index="05"
      meta="Reach me"
      title="Say hello"
      description="I read everything that comes in, and I answer faster than I probably should. Internships, freelance backend work, security projects, or just a question about a repo, all fair game."
    >
      <a
        href={`mailto:${site.email}`}
        className="inline-block text-[clamp(1.5rem,4.5vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] text-ink underline decoration-signal decoration-[2px] underline-offset-[10px] transition-colors hover:text-signal"
      >
        {site.email}
      </a>

      <ul className="mt-14 max-w-xl border-b border-rule-soft">
        {channels.map((channel) => (
          <li key={channel.label} className="border-t border-rule-soft">
            <a
              href={channel.url}
              target={channel.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                channel.url.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group -mx-4 flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-paper-sunk"
            >
              <span
                aria-hidden="true"
                className="w-4 shrink-0 text-sm text-ink-faint"
              >
                {channel.icon}
              </span>
              <span className="label w-24 shrink-0 text-ink">
                {channel.label}
              </span>
              <span className="min-w-0 truncate text-[0.9375rem] text-ink-faint transition-colors group-hover:text-signal">
                {channel.handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Contact;
