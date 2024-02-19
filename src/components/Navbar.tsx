import React from "react";

interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    page: "home",
  },
  {
    label: "Rules",
    page: "rules",
  },
  {
    label: "Ranking",
    page: "ranking",
  },
];

function Navbar() {
  return (
    <header className="w-full mx-auto border-b px-4">
      <div></div>
      <div className="flex justify-center items-end mx-auto py-4 w-[60vw] relative">
        <div className="mx-2">
          <picture>
            <img
              className="min-h-max h-[3.5rem] xxs:h-[2rem] xs:h-[2rem] sm:h-[2.25rem] md:h-[2.5rem]"
              src="./mastermind_iso_darkmode.png"
              alt="Mastermind logo"
            />
          </picture>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
