import {
  Antic_Didone,
  Ephesis,
  JetBrains_Mono,
  Raleway,
} from "next/font/google";

export const fontSans = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontSerif = Antic_Didone({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const fontCaligraphy = Ephesis({
  variable: "--font-caligraphy",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
