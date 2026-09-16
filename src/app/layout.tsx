import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QITRA — Luxury Fashion, Makeup, Jewellery & Perfume",
    template: "%s | QITRA",
  },
  description:
    "Explore luxury collections across Clothes, high-performance Makeup, handcrafted Fine Jewellery, and artisanal Perfumes.",
  keywords: [
    "luxury clothes",
    "designer fashion",
    "makeup",
    "cosmetics",
    "fine jewellery",
    "gold jewellery",
    "perfume",
    "fragrance",
    "luxury store",
    "Qitra",
  ],
  openGraph: {
    title: "QITRA — Luxury Fashion, Makeup, Jewellery & Perfume",
    description:
      "Explore luxury collections across Clothes, high-performance Makeup, handcrafted Fine Jewellery, and artisanal Perfumes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
