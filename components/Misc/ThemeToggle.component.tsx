const OPTIONS = [
  { value: "auto", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

/**
 * Stateless by design. The inline script in _document owns the choice and
 * writes it to <html data-theme-pref>, and CSS derives the pressed state from
 * there, so this never re-renders and works just as well on the landing page,
 * which ships no React at all.
 */
const ThemeToggle = () => {
  return (
    <div role="group" aria-label="Colour theme" className="theme-toggle label">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          data-theme-set={option.value}
          aria-pressed={option.value === "auto"}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export { ThemeToggle };
