import type { iconProps } from "../../@types/prop.types";

const Icon = ({ icon, url }: iconProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="contact icon"
      className="rounded-lg bg-zinc-800 p-2 text-2xl text-white ring-zinc-300 transition-all duration-150 hover:ring-2"
    >
      {icon}
    </a>
  );
};

export { Icon };
