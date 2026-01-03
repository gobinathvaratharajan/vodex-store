import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DataInitializer } from "@/components/DataInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vodex",
  description: "Vodex ecommerce - ecommerce site build for store owner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative min-h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <DataInitializer />
          <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Header />
            {children}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
