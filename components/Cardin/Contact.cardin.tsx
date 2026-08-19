import {
  BsSpotify,
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  MdEmail,
  SiGithub,
} from "../Misc/Icons.collection";
import { IconLink } from "../Misc/Icon.component";
import { Reveal } from "../Misc/Reveal.component";
import { Section } from "../Misc/Section.component";
import { site } from "../../lib/site";

const socials = [
  { icon: <SiGithub />, url: site.github, label: "GitHub" },
  { icon: <FaLinkedinIn />, url: site.linkedin, label: "LinkedIn" },
  { icon: <FaDiscord />, url: site.discord, label: "Discord" },
  { icon: <FaInstagram />, url: site.instagram, label: "Instagram" },
  { icon: <BsSpotify />, url: site.spotify, label: "Spotify" },
  { icon: <MdEmail />, url: `mailto:${site.email}`, label: "Email" },
];

const Contact = () => {
  return (
    <Section
      id="contact"
      index="05"
      title="Say hello"
      description="I read everything that comes in, and I answer faster than I probably should. Internships, freelance backend work, security projects, or just a question about a repo, all fair game."
    >
      <Reveal>
        <a
          href={`mailto:${site.email}`}
          className="inline-block font-jost text-2xl font-semibold text-white underline decoration-accent-400/40 decoration-2 underline-offset-8 transition-colors hover:text-accent-300 hover:decoration-accent-400 sm:text-3xl"
        >
          {site.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <IconLink icon={social.icon} url={social.url} label={social.label} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
};

export default Contact;
