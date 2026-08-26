import { Section } from "../Misc/Section.component";
import { alsoKnows, skills } from "./skills.data";

const columns = "md:grid-cols-[11rem_minmax(0,1fr)_13rem]";

const Skills = () => {
  return (
    <Section
      id="skills"
      index="02"
      meta={`${skills.length} entries`}
      title="What I work with"
      description="The tools I actually reach for, and what I use each one to do."
    >
      <div
        className={`hidden gap-x-8 border-b border-ink pb-2.5 md:grid ${columns}`}
      >
        <span className="label text-ink-faint">Capability</span>
        <span className="label text-ink-faint">What I use it for</span>
        <span className="label text-ink-faint">Tooling</span>
      </div>

      <ul>
        {skills.map((skill) => (
          <li
            key={skill.name}
            className={`grid gap-x-8 gap-y-1.5 border-b border-rule-soft py-5 md:grid ${columns}`}
          >
            <h3 className="text-[0.9375rem] font-medium text-ink">
              {skill.name}
            </h3>
            <p className="max-w-measure text-[0.9375rem] leading-[1.6]">
              {skill.blurb}
            </p>
            <p className="label text-ink-faint">{skill.tags.join(" · ")}</p>
          </li>
        ))}

        <li
          className={`grid gap-x-8 gap-y-1.5 border-b border-rule-soft py-5 md:grid ${columns}`}
        >
          <h3 className="text-[0.9375rem] font-medium text-ink-faint">
            Also comfortable
          </h3>
          <p className="label text-ink-faint md:col-span-2">
            {alsoKnows.join(" · ")}
          </p>
        </li>
      </ul>
    </Section>
  );
};

export default Skills;
