import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const languages = ["en", "th", "zh"] as const;
export type LanguageCode = (typeof languages)[number];

export const languageLabels: Record<LanguageCode, string> = {
  en: "English",
  th: "ไทย",
  zh: "中文",
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => undefined,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
