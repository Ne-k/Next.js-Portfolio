import { HiArrowUpRight } from "../Misc/Icons.collection";

const destinations = [
  {
    name: "cardin.nguyen.ink",
    person: "Cardin Nguyen",
    blurb: "Backend developer and cybersecurity student. Projects, skills, and resume.",
    href: "https://cardin.nguyen.ink",
    live: true,
  },
  {
    name: "dylan.nguyen.ink",
    person: "Dylan Nguyen",
    blurb: "Reserved and under construction. The full site will launch here.",
    href: "https://dylan.nguyen.ink",
    live: false,
  },
];

const LandingHero = () => {
  return (
    <div className="relative isolate mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-5 py-16 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_35%,transparent_100%)]" />
        <div className="absolute left-1/2 top-1/4 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <p className="font-jost text-xs uppercase tracking-[0.4em] text-accent-300/80">nguyen.ink</p>

      <h1 className="mt-6 font-jost text-4xl font-semibold tracking-tight sm:text-6xl">
        <span className="text-gradient">Two people, one domain.</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
        This is the front door. Pick a subdomain below, or come back later for the full landing
        experience.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {destinations.map((destination) => (
          <li key={destination.href}>
            <a
              href={destination.href}
              className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-jost text-lg font-semibold text-white group-hover:text-accent-300">
                  {destination.person}
                </span>
                <HiArrowUpRight
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-sm text-slate-500 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-300"
                />
              </div>

              <span className="mt-1 font-jost text-sm text-slate-400">{destination.name}</span>
              <span className="mt-4 flex-1 text-sm leading-6 text-slate-400">
                {destination.blurb}
              </span>

              <span
                className={`mt-5 w-fit rounded-full border px-2.5 py-0.5 font-jost text-[0.65rem] uppercase tracking-wide ${
                  destination.live
                    ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                {destination.live ? "Live" : "Coming soon"}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingHero;
