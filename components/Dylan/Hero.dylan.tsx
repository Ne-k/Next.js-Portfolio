const DylanHero = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center">
      <section className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-8 shadow-2xl shadow-black/30 sm:p-12">
        <p className="font-jost text-sm uppercase tracking-[0.35em] text-white/55">Dylan Nguyen</p>
        <h1 className="mt-6 max-w-2xl font-jost text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          This page is coming soon...
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          For now, this is a placeholder for Dylan Nguyen. Once the full site is ready, it will be
          launched here. Stay tuned for updates.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://nguyen.ink"
            className="rounded-full border border-white/15 bg-white/8 px-5 py-3 font-jost text-sm uppercase tracking-[0.25em] text-white transition hover:border-white/30 hover:bg-white/12"
          >
            Back to Nguyen.ink
          </a>
        </div>
      </section>
    </div>
  );
};

export default DylanHero;
