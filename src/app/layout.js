import { TooltipProvider } from "@/components/ui/tooltip";
import AppProviders from "@/providers/AppProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { fontCaligraphy, fontMono, fontSans, fontSerif } from "@/styles/fonts";
import "../styles/globals.css";

export const metadata = {
  // ── DASAR ──────────────────────────────────────────────────
  metadataBase: new URL("https://dhiiann.aiimmm.net"),
  title: {
    default: "Wedding Invitation | Dhian & Aim",
    template: "%s | Wedding Dhian & Aim",
  },
  description:
    "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan pernikahan kami. Tanpa kehadiran dan doa restu Anda, momen bahagia ini terasa kurang sempurna.",
  keywords: [
    "undangan pernikahan",
    "pernikahan dhian dan aim",
    "pernikahan aim",
    "pernikahan dhian",
    "dhian dan aim",
    "wedding invitation",
    "undangan digital",
  ],
  authors: [
    {
      name: "Dhian & Aim",
      url: "https://aiimmm.net",
    },
  ],
  creator: "Dhian & Aim",
  publisher: "Dhian & Aim",

  // ── CANONICAL & ROBOTS ─────────────────────────────────────
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── OPEN GRAPH ─────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dhiiann.aiimmm.net",
    siteName: "Pernikahan Dhian & Aim",
    title: "Undangan Pernikahan Dhian & Aim",
    description:
      "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan pernikahan kami. Tanpa kehadiran dan doa restu Anda, momen bahagia ini terasa kurang sempurna.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Dhian & Aim",
        type: "image/jpeg",
      },
    ],
  },

  // ── TWITTER / X ────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Dhian & Aim",
    description:
      "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan pernikahan kami. Tanpa kehadiran dan doa restu Anda, momen bahagia ini terasa kurang sempurna.",
    images: ["/images/og-default.png"],
  },

  // ── FAVICON — semua file ada di /public/favicon/ ───────────
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  // ── WEB APP MANIFEST ───────────────────────────────────────
  manifest: "/favicon/site.webmanifest",

  // ── LAINNYA ────────────────────────────────────────────────
  applicationName: "Undangan Pernikahan Dhian & Aim",
  category: "wedding invitation",
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${fontSans.variable} 
        ${fontMono.variable} 
        ${fontSerif.variable}
        ${fontCaligraphy.variable}
        h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AppProviders>
            <TooltipProvider>{children}</TooltipProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
