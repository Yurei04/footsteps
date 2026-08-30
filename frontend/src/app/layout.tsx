import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { defaultMetdata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const astaFont = localFont({
  src: "./fonts/asta_font.ttf",
  variable: "--font-asta",
});

export const metadata = defaultMetdata

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${astaFont.variable} h-full antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}