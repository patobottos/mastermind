import type { Metadata } from "next";
import ThemeClient from "./providers";

/* THEME FONTS */
import {
  Inter,
  Raleway,
  Poppins,
  Libre_Baskerville,
  Merriweather,
  Roboto,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});

export const metadata: Metadata = {
  title: "Pato Bottos Mastermind",
  description: "Mastermind Game App 🚀",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth light dark" suppressHydrationWarning>
      <head />
      <body
        className={`${roboto.variable} ${libre.variable} font-lightTheme dark:font-darkTheme bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text`}
      >
        <ThemeClient>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex justify-center pt-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeClient>
      </body>
    </html>
  );
}

