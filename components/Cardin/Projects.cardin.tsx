import { GoRepoForked, GoStar, HiArrowUpRight, SiGithub } from "../Misc/Icons.collection";
import { Reveal } from "../Misc/Reveal.component";
import { Section } from "../Misc/Section.component";
import type { Project } from "../../lib/github";
import { site } from "../../lib/site";

/** GitHub's own language colours, so the dots read the way people expect. */
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Dockerfile: "#384d54",
};

// Fixed to UTC so the build-time render and the client render always agree.
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatUpdated = (iso: string) => {
  const parsed = Date.parse(iso);

  return Number.isNaN(parsed) ? null : monthFormatter.format(parsed);
};

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Section
      id="projects"
      index="03"
      title="Things I have built"
      description="Pulled from my GitHub and sorted by whatever I touched most recently, so this list stays honest."
    >
      {projects.length === 0 ? (
        <Reveal className="rounded-xl border border-white/8 bg-white/[0.02] p-10 text-center">
          <p className="font-jost text-lg text-white">Projects are taking a moment.</p>
          <p className="mt-2 text-sm text-slate-400">
            The GitHub listing could not be loaded right now.{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-300 underline underline-offset-4 hover:text-accent-200"
            >
              Browse the repositories directly
            </a>
            .
          </p>
        </Reveal>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={index * 60} className="h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-colors duration-200 hover:border-accent-400/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 break-words font-jost text-lg font-semibold text-white group-hover:text-accent-300">
                    {project.name}
                  </h3>
                  <HiArrowUpRight
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-sm text-slate-500 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-300"
                  />
                </div>

                {project.archived ? (
                  <span className="mt-2 inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-0.5 font-jost text-[0.65rem] font-semibold uppercase tracking-wide text-amber-200">
                    Archived
                  </span>
                ) : null}

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>

                {/* Spacer keeps the meta row pinned to the bottom of every card. */}
                <div className="flex-1" />

                {project.topics.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-md bg-white/5 px-2 py-0.5 font-jost text-[0.7rem] text-slate-400"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/5 pt-4 font-jost text-xs text-slate-400">
                  {project.language ? (
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: languageColors[project.language] ?? "#8b8b95" }}
                      />
                      {project.language}
                    </span>
                  ) : null}

                  {project.stars > 0 ? (
                    <span className="flex items-center gap-1">
                      <GoStar aria-hidden="true" />
                      {project.stars}
                      <span className="sr-only">stars</span>
                    </span>
                  ) : null}

                  {project.forks > 0 ? (
                    <span className="flex items-center gap-1">
                      <GoRepoForked aria-hidden="true" />
                      {project.forks}
                      <span className="sr-only">forks</span>
                    </span>
                  ) : null}

                  {formatUpdated(project.pushedAt) ? (
                    <span className="ml-auto">Updated {formatUpdated(project.pushedAt)}</span>
                  ) : null}
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      )}

      <Reveal className="mt-10 flex justify-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 font-jost text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10"
        >
          <SiGithub className="text-base" />
          See everything on GitHub
        </a>
      </Reveal>
    </Section>
  );
};

export default Projects;
