import type { ReactElement } from "react";

interface iconProps {
  icon: ReactElement;
  url: string;
}

interface linkProps {
  text: string;
  url: string;
}

export type { iconProps, linkProps };
