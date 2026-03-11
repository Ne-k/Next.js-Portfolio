import Head from "next/head";
import type { NextPage } from "next";

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nguyen.ink</title>
        <meta
          name="description"
          content="Nguyen.ink is a placeholder page while the main landing experience is being prepared."
        />
        <link rel="canonical" href="https://nguyen.ink" />
        <meta property="og:title" content="Nguyen.ink" />
        <meta
          property="og:description"
          content="Nguyen.ink is a placeholder page while the main landing experience is being prepared."
        />
        <meta property="og:url" content="https://nguyen.ink" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 shadow-2xl shadow-black/30 backdrop-blur sm:px-10 sm:py-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.14),_transparent_32%)]" />

            <div className="max-w-2xl">
              <p className="font-jost text-sm uppercase tracking-[0.35em] text-white/55">
                Nguyen.ink
              </p>
              <h1 className="mt-6 font-jost text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Placeholder page.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                The main landing experience for nguyen.ink is not live yet. This page is
                here as a temporary placeholder while the final site is being prepared.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://cardin.nguyen.ink"
                  className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 font-jost text-sm uppercase tracking-[0.25em] text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-300/15"
                >
                  cardin.nguyen.ink
                </a>
                <a
                  href="https://dylan.nguyen.ink"
                  className="rounded-full border border-white/10 bg-zinc-900/70 px-5 py-3 font-jost text-sm uppercase tracking-[0.25em] text-zinc-200 transition hover:border-white/20 hover:bg-zinc-900"
                >
                  dylan.nguyen.ink
                </a>
              </div>
              <div className="mt-5 inline-flex rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 font-jost text-xs uppercase tracking-[0.3em] text-zinc-300">
                Main landing coming soon
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;