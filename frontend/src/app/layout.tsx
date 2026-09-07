import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Metadata, Viewport } from "next"
import { defaultMetadata, defaultViewport } from "@/lib/metadata"

export const metadata: Metadata = defaultMetadata
export const viewport: Viewport = defaultViewport

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