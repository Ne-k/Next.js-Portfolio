import Head from "next/head";
import type { NextPage } from "next";

const DylanPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dylan Nguyen | Coming Soon</title>
        <meta
          name="description"
          content="A placeholder page for Dylan Nguyen at dylan.nguyen.ink while the full site is being prepared."
        />
        <link rel="canonical" href="https://dylan.nguyen.ink" />
        <meta property="og:title" content="Dylan Nguyen | Coming Soon" />
        <meta
          property="og:description"
          content="Dylan Nguyen's page is reserved and will launch here soon."
        />
        <meta property="og:url" content="https://dylan.nguyen.ink" />
      </Head>

      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white sm:px-10 lg:px-12">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center">
          <section className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-8 shadow-2xl shadow-black/30 sm:p-12">
            <p className="font-jost text-sm uppercase tracking-[0.35em] text-white/55">
              Dylan Nguyen
            </p>
            <h1 className="mt-6 max-w-2xl font-jost text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              This space is reserved and ready for a full profile.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              The domain is wired up and the placeholder is live. Once Dylan&apos;s
              content is ready, this page can be replaced with the finished site
              without changing the domain structure.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://nguyen.ink"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-3 font-jost text-sm uppercase tracking-[0.25em] text-white transition hover:border-white/30 hover:bg-white/12"
              >
                Back to Nguyen.ink
              </a>
              <a
                href="https://cardin.nguyen.ink"
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 font-jost text-sm uppercase tracking-[0.25em] text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-300/15"
              >
                Visit Cardin&apos;s site
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DylanPage;