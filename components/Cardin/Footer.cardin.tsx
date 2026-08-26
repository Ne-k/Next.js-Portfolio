import { navLinks, site } from "../../lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="label text-ink">
            {site.name} / {site.location}
          </p>
          <p className="mt-2 max-w-measure text-sm leading-[1.7] text-ink-faint">
            &copy; {year}. Built in Next.js, hosted on a domain I probably
            overpaid for.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="label text-ink-faint transition-colors hover:text-signal"
            >
              {link.text}
            </a>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-ink-faint transition-colors hover:text-signal"
          >
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
