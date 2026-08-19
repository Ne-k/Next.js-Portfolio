import type { IconType } from "react-icons";

import {
  FaJava,
  FaNodeJs,
  FaShieldAlt,
  FiCamera,
  SiPython,
  SiTypescript,
} from "../Misc/Icons.collection";
import { Reveal } from "../Misc/Reveal.component";
import { Section } from "../Misc/Section.component";
import { skills } from "./skills.data";
import type { Skill } from "./skills.data";

const iconMap: Record<Skill["icon"], IconType> = {
  shield: FaShieldAlt,
  python: SiPython,
  typescript: SiTypescript,
  node: FaNodeJs,
  java: FaJava,
  camera: FiCamera,
};

const alsoKnows = ["Next.js", "React", "C++", "Docker", "Git", "SQL", "SSH", "IAM"];

const Skills = () => {
  return (
    <Section
      id="skills"
      index="02"
      title="What I work with"
      description="The tools I actually reach for, and what I use each one to do."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill.icon];

          return (
            <Reveal
              key={skill.name}
              delay={index * 70}
              className="group h-full rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-colors duration-200 hover:border-accent-400/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <Icon aria-hidden="true" className="text-xl text-accent-400" />
                <h3 className="font-jost text-lg font-semibold text-white">{skill.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{skill.blurb}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 font-jost text-[0.7rem] uppercase tracking-wide text-slate-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-400">
        <span className="font-jost">Also comfortable with</span>
        {alsoKnows.map((item) => (
          <span key={item} className="rounded-md bg-white/5 px-2 py-1 font-jost text-slate-300">
            {item}
          </span>
        ))}
      </Reveal>
    </Section>
  );
};

export default Skills;
