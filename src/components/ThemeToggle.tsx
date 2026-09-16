"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04]" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative w-9 h-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 text-[var(--color-text-muted)] hover:text-[#d4af37] transition-all duration-200 flex items-center justify-center shrink-0 group"
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform group-hover:rotate-12" />
      ) : (
        <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
