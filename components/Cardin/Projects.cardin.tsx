import { useEffect, useState } from "react";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  html_url: string;
  pushed_at: string;
};

const pastelGradients = [
  ["#FFD1DC", "#FF9E9D"],
  ["#B5EAD7", "#C7CEEA"],
  ["#FFDAC1", "#E2F0CB"],
  ["#FFB7B2", "#FF9AA2"],
  ["#B5EAD7", "#AFCBFA"],
  ["#FAD2E1", "#99DDCC"],
  ["#FFC8DD", "#D6AEDD"],
  ["#F3EAC2", "#F5D6BA"],
  ["#ECD4FF", "#FFC4E1"],
  ["#A8E6CF", "#FDFFAB"],
] as const;

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Ne-k/repos");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Repository[] = await response.json();
        const filteredRepos = data
          .filter((repo) => !repo.fork)
          .sort(
            (left, right) =>
              new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime(),
          )
          .slice(0, 8);

        setRepos(filteredRepos);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="my-16 px-3 font-sen text-center text-lg text-slate-300" id="projects">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="my-16 px-3 font-sen" id="projects">
      <p className="text-center text-2xl font-bold text-white sm:text-3xl">
        <a
          href="https://github.com/Ne-k"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:font-bold"
        >
          <u>Recently Updated Projects</u>
        </a>
      </p>

      <div className="my-8 flex flex-wrap items-center justify-center gap-10 px-4 sm:px-8">
        {repos.length === 0 ? (
          <div
            className="h-auto min-h-[7rem] max-w-[20rem] rounded-lg p-1 text-white"
            style={{ background: "linear-gradient(to right, #FFD1DC, #FF9E9D)" }}
          >
            <div className="flex h-full w-auto flex-col items-center justify-center rounded-lg bg-primary px-2 py-2 text-center font-medium">
              <p className="project-name break-all text-lg font-semibold">No Projects Found...</p>
              <p className="project-description text-sm break-words">No description available.</p>
            </div>
          </div>
        ) : (
          repos.map((repo, index) => {
            const [colorStart, colorEnd] = pastelGradients[index % pastelGradients.length];

            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="h-auto min-h-[7rem] max-w-[20rem] cursor-pointer rounded-lg p-1 text-white duration-100 hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
                }}
              >
                <div className="flex h-full w-auto flex-col items-center justify-center rounded-lg bg-primary px-2 py-2 text-center font-medium">
                  <p
                    className="project-name overflow-hidden px-4 py-2 text-lg font-semibold text-ellipsis whitespace-nowrap"
                    style={{ minWidth: "10rem" }}
                  >
                    {repo.name}
                  </p>
                  <p className="project-description text-sm break-words">
                    {repo.description || "No description available."}
                  </p>
                </div>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Projects;
