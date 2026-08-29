import { useEffect, useState } from "react";

type Mode = "light" | "dark";

const STORAGE_KEY = "pk-theme";

function apply(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

const labels: Record<Mode, string> = {
  light: "Light",
  dark: "Dark",
};

const glyphs: Record<Mode, string> = {
  light: "☀",
  dark: "☾",
};

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Mode = stored === "dark" ? "dark" : "light";

    setMode(initial);
    apply(initial);
  }, []);

  function toggle() {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={`Theme: ${labels[mode]}`}
      aria-label={`Theme: ${labels[mode]}. Click to change.`}
      className="grid size-9 place-items-center rounded-full border border-ink/25 text-base text-ink transition hover:border-ink/60"
    >
      <span aria-hidden="true">{glyphs[mode]}</span>
    </button>
  );
}
