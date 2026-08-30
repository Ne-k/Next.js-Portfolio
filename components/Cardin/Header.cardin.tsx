import { useEffect, useState } from "react";

import { HiBars3, HiXMark } from "../Misc/Icons.collection";
import { ThemeToggle } from "../Misc/ThemeToggle.component";
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

    if (sections.length === 0 || typeof IntersectionObserver === "undefined")
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) => right.intersectionRatio - left.intersectionRatio,
          )[0];

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
      className={`sticky top-0 z-50 border-b bg-paper transition-colors duration-200 ${
        scrolled ? "border-ink" : "border-rule"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[72rem] items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="label grid h-7 w-7 place-items-center border border-ink text-ink">
            {/*
              Two nudges to centre the letterforms rather than their text box.
              -mr cancels the trailing letter-space `.label` adds after the "N",
              which otherwise pulls the pair 0.7px left of centre; translate-y
              corrects the 0.8px the line box sits high. Both in em, so they
              hold if the mark is ever resized.
            */}
            <span className="-mr-[0.12em] translate-y-[0.073em]">CN</span>
          </span>
          <span className="label hidden text-ink sm:inline">
            Cardin Nguyen<span className="text-ink-faint"> / nguyen.ink</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const id = link.url.replace("#", "");

            return (
              <a
                key={link.url}
                href={link.url}
                aria-current={active === id ? "true" : undefined}
                className={`label border-b py-0.5 transition-colors ${
                  active === id
                    ? "border-signal text-ink"
                    : "border-transparent text-ink-faint hover:border-rule hover:text-ink"
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
            className="label border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Resume
          </a>

          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-9 w-9 place-items-center border border-rule text-lg text-ink transition-colors hover:border-ink md:hidden"
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-rule bg-paper px-5 pb-6 md:hidden"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="label flex items-center justify-between border-b border-rule-soft py-4 text-ink"
                >
                  {link.text}
                  <span aria-hidden="true" className="text-ink-faint">
                    {link.url}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="label mt-6 block border border-ink py-3 text-center text-ink"
          >
            Resume (PDF)
          </a>

          <div className="mt-6 flex items-center justify-between">
            <span className="label text-ink-faint">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
