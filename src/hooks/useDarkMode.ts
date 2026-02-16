"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getServerSnapshot(): Theme {
  return "light";
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
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useDarkMode() {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    const currentTheme = getClientSnapshot();
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("theme-change"));
  };

  return { theme, toggleTheme };
}
