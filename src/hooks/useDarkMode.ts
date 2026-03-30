"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
  };
}

function getClientSnapshot(): Theme {
  if (typeof window !== "undefined") {
    document.documentElement.classList.add("dark");
  }
  return "dark";
}

export function useDarkMode() {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    // Disabled toggle: site is locked to dark mode
  };

  return { theme, toggleTheme };
}
