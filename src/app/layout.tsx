import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Food Rescue Network — Rescue Food. Feed Communities.",
  description:
    "Connect surplus food from restaurants, hotels, and events to nearby communities before it goes to waste. Reduce food waste, feed people, and build stronger communities.",
  keywords: [
    "food rescue",
    "food donation",
    "reduce food waste",
    "community food",
    "surplus food",
    "food distribution",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
