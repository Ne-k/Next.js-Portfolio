export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  archived: boolean;
  pushedAt: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
};

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USER ?? "Ne-k";

/**
 * Repositories to keep off the site regardless of how recently they were pushed.
 * Add a repo name here (lowercase) to hide it without touching GitHub.
 */
const HIDDEN_REPOS = new Set<string>(["nebulix"]);

/**
 * Repos worth showing that the user does not own, so they never come back from
 * the /users/:user/repos listing. Pinned to the front of the grid in this order.
 */
const FEATURED_REPOS = ["2BDetermined-7034/2024-Crescendo"];

/**
 * Fetches the user's most recently pushed public repositories.
 *
 * Runs at build time / during ISR revalidation rather than in the browser, so
 * the page ships with projects already in the HTML and visitors never spend a
 * round trip (or a rate-limit failure) on api.github.com.
 */
function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nguyen.ink-portfolio",
  };

  // Optional: lifts the rate limit from 60/hr to 5000/hr on build machines.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function toProject(repo: GitHubRepo): Project {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "No description available.",
    url: repo.html_url,
    homepage: repo.homepage?.trim() ? repo.homepage : null,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: (repo.topics ?? []).slice(0, 3),
    archived: repo.archived,
    pushedAt: repo.pushed_at,
  };
}

async function getFeatured(headers: Record<string, string>): Promise<Project[]> {
  const results = await Promise.all(
    FEATURED_REPOS.map(async (fullName) => {
      const response = await fetch(`https://api.github.com/repos/${fullName}`, { headers });

      if (!response.ok) {
        // One missing pin should not take the whole section down.
        console.error(`Featured repo ${fullName} responded with ${response.status}`);
        return null;
      }

      return toProject((await response.json()) as GitHubRepo);
    }),
  );

  return results.filter((project): project is Project => project !== null);
}

export async function getProjects(limit = 9): Promise<Project[]> {
  const headers = buildHeaders();

  const [featured, response] = await Promise.all([
    getFeatured(headers),
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&type=owner`, {
      headers,
    }),
  ]);

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const repos = (await response.json()) as GitHubRepo[];
  const featuredIds = new Set(featured.map((project) => project.id));

  const owned = repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.private &&
        !HIDDEN_REPOS.has(repo.name.toLowerCase()) &&
        !featuredIds.has(repo.id),
    )
    .sort((left, right) => Date.parse(right.pushed_at) - Date.parse(left.pushed_at))
    .map(toProject);

  return [...featured, ...owned].slice(0, limit);
}
