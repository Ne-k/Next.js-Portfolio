import { useEffect, useState } from "react";

import { HiBars3, HiXMark } from "../Misc/Icons.collection";
import { navLinks, site } from "../../lib/site";

const sectionIds = navLinks.map((link) => link.url.replace("#", ""));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for whichever section currently owns the viewport.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/8 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-jost text-sm font-semibold tracking-tight text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-glow-400 text-[0.7rem] font-bold text-ink-950">
            CN
          </span>
          <span className="hidden sm:inline">
            cardin<span className="text-slate-400">.nguyen.ink</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.url.replace("#", "");

            return (
              <a
                key={link.url}
                href={link.url}
                aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-3.5 py-1.5 font-jost text-sm transition-colors ${
                  active === id
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.text}
              </a>
            );
          })}

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-1.5 font-jost text-sm font-medium text-accent-300 transition-colors hover:border-accent-400/60 hover:bg-accent-400/20 hover:text-white"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-xl text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/8 bg-ink-950/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 font-jost text-lg text-slate-200 transition-colors hover:text-accent-300"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-xl border border-accent-400/30 bg-accent-400/10 py-3 text-center font-jost text-base font-medium text-accent-300"
          >
            View Resume
          </a>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
