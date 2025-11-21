import { ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import { Theme } from "@appTypes/theme";
import ThemeContext from "@contexts/ThemeContext";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || "light");
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply theme class to document (for web) and set direction for RTL
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.setAttribute(
        "dir",
        i18n.language === "fa" ? "rtl" : "ltr"
      );
    }
  }, [theme, i18n.language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
