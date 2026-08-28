import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
    default: "LUXE PARFUM — Premium Perfume Store",
    template: "%s | LUXE PARFUM",
  },
  description:
    "Discover exquisite fragrances for Men, Women, Children, and Unisex. Premium perfumes curated for every occasion.",
  keywords: [
    "perfume",
    "fragrance",
    "luxury perfume",
    "men perfume",
    "women perfume",
    "unisex fragrance",
    "buy perfume online",
  ],
  openGraph: {
    title: "LUXE PARFUM — Premium Perfume Store",
    description:
      "Discover exquisite fragrances for Men, Women, Children, and Unisex.",
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
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
