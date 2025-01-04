"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
import { FaHouse, FaCircleInfo, FaRankingStar } from "react-icons/fa6";

interface NavItem {
  label: string;
  page: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    page: "./",
    icon: <FaHouse className="h-5 w-5" />,
  },
  {
    label: "Rules",
    page: "/rules",
    icon: <FaCircleInfo className="h-5 w-5" />,
  },
  {
    label: "Ranking",
    page: "/ranking",
    icon: <FaRankingStar className="h-5 w-5" />,
  },
];

function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full mx-auto border-b p-4 flex items-center">
      <div className="flex justify-between items-end mx-auto w-[80vw] relative">
        {/* LOGO */}
        <div>
          <Link href="/">
            <picture>
              {mounted ? (
                theme === "dark" ? (
                  <Image
                    className="max-w-[full] h-auto w-[14rem] xxs:w-[6rem] xs:w-[8rem] sm:w-[10rem] md:w-[12rem]"
                    src="/mastermind_iso_darkmode.png"
                    alt="Mastermind logo for dark mode"
                    priority
                    width={224} // Default width for responsive design
                    height={80} // Default height for responsive design
                  />
                ) : (
                  <Image
                    className="max-w-[full] h-auto w-[14rem] xxs:w-[6rem] xs:w-[8rem] sm:w-[10rem] md:w-[12rem]"
                    src="/mastermind_iso_lightmode.png"
                    alt="Mastermind logo for light mode"
                    priority
                    width={224}
                    height={80}
                  />
                )
              ) : (
                // Show a placeholder during initial render
                <Image
                  className="max-w-[full] h-auto w-[14rem] xxs:w-[6rem] xs:w-[8rem] sm:w-[10rem] md:w-[12rem]"
                  src="/mastermind_iso_darkmode.png" // Default to dark mode logo
                  alt="Mastermind logo loading..."
                  priority
                  width={224}
                  height={80}
                />
              )}
            </picture>
          </Link>
        </div>

        {/* MENU */}
        <div className="flex items-center space-x-2">
          <ul className="flex items-center p-1">
            {NAV_ITEMS.map((item, index) => (
              <li key={index} className="mx-2">
                <Link href={item.page}>{item.icon}</Link>
              </li>
            ))}
          </ul>

          {/* MODE SWITCHER */}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
