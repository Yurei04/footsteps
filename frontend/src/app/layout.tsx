import localFont from "next/font/local";
import { Metadata, Viewport } from "next"
import { defaultMetadata, defaultViewport } from "@/lib/metadata"
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CombinedNavigation } from "@/components/dashboard/navigation";
import "./globals.css"

const astaFont = localFont({
  src: "./fonts/asta_font.ttf",
  variable: "--font-asta",
});

export const metadata: Metadata = defaultMetadata
export const viewport: Viewport = defaultViewport
 
export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta 
          name="theme-color" 
          content="#ffffff" 
          media="(prefers-color-scheme: light)" 
        />
        <meta 
          name="theme-color" 
          content="#0f172a" 
          media="(prefers-color-scheme: dark)" 
        />
      </head>
      <body className={`${astaFont.variable} bg-background text-foreground`}>
        <div className="flex flex-col lg:flex-row min-h-screen">
            <main className="w-full bg-background text-foreground transition-colors duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
 