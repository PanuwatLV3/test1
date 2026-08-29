import { Link } from "@tanstack/react-router";

import { languageLabels, languages, useLanguage } from "@/lib/i18n";

export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/15 bg-cream/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          {/* <img
            src={pengshenLogo}
            alt="Peng Shen logo"
            className="h-12 w-12 rounded-full border border-ink/15 bg-ink object-cover shadow-sm sm:h-14 sm:w-14"
          /> */}
          <span className="font-display text-lg tracking-wide sm:text-xl">
            About<span className="text-copper"> </span>Me
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Select language</span>
            <select
              aria-label="Select language"
              value={language}
              onChange={(event) => setLanguage(event.target.value as (typeof languages)[number])}
              className="appearance-none rounded-full border border-ink/20 bg-parchment/80 px-3 py-2 pr-8 text-xs font-medium text-ink shadow-sm outline-none transition hover:border-ink/50 focus:border-copper sm:text-sm"
            >
              {languages.map((code) => (
                <option key={code} value={code}>
                  {languageLabels[code]}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink/70">
              ▾
            </span>
          </label>
        </div>
      </div>
    </header>
  );
}
