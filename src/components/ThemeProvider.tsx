"use client";

import { ReactNode, createContext, useContext } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

type ThemeContextType = ReturnType<typeof useDarkMode>;

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const darkMode = useDarkMode();

  return (
    <ThemeContext.Provider value={darkMode}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
