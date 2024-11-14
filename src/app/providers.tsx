"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Retrieve the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme); // Apply 'dark' or 'light' class to <html>
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
