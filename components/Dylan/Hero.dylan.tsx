import { HiOutlineArrowNarrowRight } from "../Misc/Icons.collection";

const DylanHero = () => {
  return (
    <div className="relative isolate mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-16 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_35%,transparent_100%)]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-glow-400/10 blur-[120px]" />
      </div>

      <p className="font-jost text-xs uppercase tracking-[0.4em] text-accent-300/80">
        dylan.nguyen.ink
      </p>

      <h1 className="mt-6 font-jost text-4xl font-semibold tracking-tight sm:text-6xl">
        <span className="text-gradient">Dylan Nguyen</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
        This page is reserved and still under construction. Once the full site is ready, it will
        launch right here.
      </p>

      <div className="mt-10">
        <a
          href="https://nguyen.ink"
          className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 font-jost text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/10"
        >
          Back to nguyen.ink
          <HiOutlineArrowNarrowRight className="transition-transform duration-150 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default DylanHero;
