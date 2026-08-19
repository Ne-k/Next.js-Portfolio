import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Rendered element. Defaults to a div so it can wrap anything. */
  as?: ElementType;
  /** Stagger in milliseconds, useful when revealing a list of cards. */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Fades and lifts its children into view once, the first time they intersect
 * the viewport. Falls back to plain content when JS or IntersectionObserver is
 * unavailable, and is disabled entirely under prefers-reduced-motion.
 */
const Reveal = ({ children, as: Tag = "div", delay = 0, className = "", id }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible="false"
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export { Reveal };
