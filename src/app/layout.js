import { TooltipProvider } from "@/components/ui/tooltip";
import AppProviders from "@/providers/AppProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { fontCaligraphy, fontMono, fontSans, fontSerif } from "@/styles/fonts";
import "../styles/globals.css";

export const metadata = {
  title: "Wedding Invitation | Dhian & Aim",
  description:
    "Template undangan digital dengan guest book dan dashboard admin.",
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
