import { Sheet } from "../Misc/Sheet.component";

const hosts = [
  {
    host: "cardin.nguyen.ink",
    owner: "Cardin Nguyen",
    blurb:
      "Backend developer and cybersecurity student. Projects, skills, and resume.",
    href: "https://cardin.nguyen.ink",
    status: "Live",
  },
  {
    host: "dylan.nguyen.ink",
    owner: "Dylan Nguyen",
    blurb: "Reserved and under construction. The full site will launch here.",
    href: "https://dylan.nguyen.ink",
    status: "Reserved",
  },
];

const columns = "sm:grid-cols-[minmax(0,1fr)_9rem_5rem]";

const LandingHero = () => {
  return (
    <Sheet masthead="nguyen.ink / index" theme="auto">
      <h1 className="max-w-[12ch] text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink">
        Two people, one domain.
      </h1>

      <p className="mt-6 max-w-measure text-[1.0625rem] leading-[1.7]">
        This is the front door. Pick a subdomain below, or come back later for
        the full landing experience.
      </p>

      <div className="mt-16">
        <div
          className={`hidden gap-x-6 border-b border-ink pb-2.5 sm:grid ${columns}`}
        >
          <span className="label text-ink-faint">Host</span>
          <span className="label text-ink-faint">Owner</span>
          <span className="label text-right text-ink-faint">Status</span>
        </div>

        <ul className="border-b border-rule-soft">
          {hosts.map((entry) => (
            <li
              key={entry.host}
              className="border-t border-rule-soft first:border-t-0 sm:first:border-t"
            >
              <a
                href={entry.href}
                className={`group -mx-4 grid items-baseline gap-x-6 gap-y-2 px-4 py-5 transition-colors hover:bg-paper-sunk ${columns}`}
              >
                <span className="min-w-0">
                  <span className="label block text-ink transition-colors group-hover:text-signal">
                    {entry.host}
                  </span>
                  <span className="mt-2 block max-w-measure text-[0.9375rem] leading-[1.6]">
                    {entry.blurb}
                  </span>
                </span>

                <span className="text-[0.9375rem] text-ink-faint">
                  {entry.owner}
                </span>

                <span
                  className={`label sm:text-right ${
                    entry.status === "Live" ? "text-signal" : "text-ink-faint"
                  }`}
                >
                  {entry.status}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
};

export default LandingHero;
