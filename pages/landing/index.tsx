import Head from "next/head";
import type { NextPage } from "next";

const people = [
  {
    name: "Cardin",
    href: "https://cardin.nguyen.ink",
    status: "Live now",
    description:
      "Backend development, projects, current work, and the portfolio already running on the family domain.",
    accent: "from-sky-400/40 via-cyan-300/20 to-transparent",
  },
  {
    name: "Dylan",
    href: "https://dylan.nguyen.ink",
    status: "Placeholder",
    description:
      "A dedicated page is reserved and ready to become Dylan's profile when the content is ready.",
    accent: "from-amber-300/35 via-orange-300/15 to-transparent",
  },
] as const;

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nguyen.ink</title>
        <meta
          name="description"
          content="Nguyen.ink is the shared landing page for Cardin and Dylan Nguyen. Choose a profile to continue."
        />
        <link rel="canonical" href="https://nguyen.ink" />
        <meta property="og:title" content="Nguyen.ink" />
        <meta
          property="og:description"
          content="Choose between Cardin Nguyen and Dylan Nguyen from the main Nguyen.ink landing page."
        />
        <meta property="og:url" content="https://nguyen.ink" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 shadow-2xl shadow-black/30 backdrop-blur sm:px-10 sm:py-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.14),_transparent_32%)]" />

            <div className="max-w-2xl">
              <p className="font-jost text-sm uppercase tracking-[0.35em] text-white/55">
                Nguyen.ink
              </p>
              <h1 className="mt-6 font-jost text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                One family domain, separate spaces for each story.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                This apex domain is the front door. Cardin&apos;s portfolio is live, and
                Dylan&apos;s page is reserved with a placeholder until the final content is
                ready.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {people.map((person) => (
                <a
                  key={person.name}
                  href={person.href}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/85 p-6 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${person.accent} opacity-100 transition duration-200 group-hover:opacity-80`} />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-jost text-3xl font-semibold">{person.name}</p>
                      <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300">
                        {person.status}
                      </span>
                    </div>
                    <p className="mt-4 max-w-md text-base leading-7 text-zinc-300">
                      {person.description}
                    </p>
                    <p className="mt-8 font-jost text-sm uppercase tracking-[0.3em] text-white/70">
                      Open site
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;