import type { ReactElement } from "react";

type IconLinkProps = {
  icon: ReactElement;
  url: string;
  /** Used as the accessible name; every icon link needs its own. */
  label: string;
};

const IconLink = ({ icon, url, label }: IconLinkProps) => {
  const isExternal = url.startsWith("http") || url.startsWith("/");

  return (
    <a
      href={url}
      target={url.startsWith("mailto:") ? undefined : "_blank"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      title={label}
      className="grid h-12 w-12 place-items-center rounded-xl border border-white/8 bg-white/[0.04] text-xl text-slate-300 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-400/40 hover:bg-white/[0.08] hover:text-white"
    >
      {icon}
    </a>
  );
};

export { IconLink };
