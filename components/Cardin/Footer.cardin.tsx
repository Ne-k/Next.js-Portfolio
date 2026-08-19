import { navLinks, site } from "../../lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-jost text-sm text-slate-400">
          &copy; {year} {site.name}. Built in Next.js, hosted on a domain I probably overpaid for.
        </p>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-jost text-sm">
          {navLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {link.text}
            </a>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-white"
          >
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
