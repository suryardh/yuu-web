"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export function Progress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    window.addEventListener("beforeunload", handleComplete);

    return () => {
      window.removeEventListener("beforeunload", handleComplete);
      NProgress.done();
    };
  }, []);

  return null;
}
