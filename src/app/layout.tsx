import type { Metadata } from "next";

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
import ThemeClient from "./providers";

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
    <html lang="en" className="scroll-smooth">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${roboto.variable} ${libre.variable} font-sans`}>
        <ThemeClient>
          <Navbar />
          {children}
          <Footer />
        </ThemeClient>
      </body>
    </html>
  );
}
