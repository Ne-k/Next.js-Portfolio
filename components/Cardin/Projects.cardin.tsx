import { GoRepoForked, GoStar, SiGithub } from "../Misc/Icons.collection";
import { Section } from "../Misc/Section.component";
import type { Project } from "../../lib/github";
import { site } from "../../lib/site";

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
      meta="From GitHub"
      title="Things I have built"
      description="Pulled from my GitHub and sorted by whatever I touched most recently, so this list stays honest."
    >
      {projects.length === 0 ? (
        <div className="max-w-measure border border-rule bg-paper-sunk p-8">
          <p className="label text-ink">Listing unavailable</p>
          <p className="mt-3 text-[0.9375rem] leading-[1.7]">
            The GitHub API could not be reached for this build.{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
            >
              Browse the repositories directly
            </a>
            .
          </p>
        </div>
      ) : (
        <ul className="border-b border-rule-soft">
          {projects.map((project, index) => {
            const updated = formatUpdated(project.pushedAt);

            return (
              <li key={project.id} className="border-t border-rule-soft">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-4 grid gap-x-8 gap-y-3 px-4 py-6 transition-colors hover:bg-paper-sunk md:grid-cols-[2.5rem_minmax(0,1fr)_10rem]"
                >
                  <span
                    aria-hidden="true"
                    className="label pt-1 text-ink-faint"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="min-w-0 break-words text-base font-medium text-ink transition-colors group-hover:text-signal">
                        {project.name}
                      </h3>

                      {project.archived ? (
                        <span className="label border border-rule px-1.5 py-0.5 text-ink-faint">
                          Archived
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 line-clamp-3 max-w-measure text-[0.9375rem] leading-[1.6]">
                      {project.description}
                    </p>

                    {project.topics.length > 0 ? (
                      <p className="label mt-3 text-ink-faint">
                        {project.topics.join(" · ")}
                      </p>
                    ) : null}
                  </div>

                  <div className="label flex flex-wrap items-center gap-x-4 gap-y-1.5 text-ink-faint md:flex-col md:items-end md:gap-y-2 md:pt-1">
                    {project.language ? (
                      <span className="text-ink">{project.language}</span>
                    ) : null}

                    {project.stars > 0 || project.forks > 0 ? (
                      <span className="flex items-center gap-3">
                        {project.stars > 0 ? (
                          <span className="flex items-center gap-1.5">
                            <GoStar aria-hidden="true" />
                            {project.stars}
                            <span className="sr-only">stars</span>
                          </span>
                        ) : null}

                        {project.forks > 0 ? (
                          <span className="flex items-center gap-1.5">
                            <GoRepoForked aria-hidden="true" />
                            {project.forks}
                            <span className="sr-only">forks</span>
                          </span>
                        ) : null}
                      </span>
                    ) : null}

                    {updated ? <span>Updated {updated}</span> : null}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-10">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex items-center gap-2.5 border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <SiGithub aria-hidden="true" className="text-sm" />
          See everything on GitHub
        </a>
      </div>
    </Section>
  );
};

export default Projects;
