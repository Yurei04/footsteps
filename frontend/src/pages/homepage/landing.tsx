// Landing.tsx (PAGE - NO "use client" needed!)
import GreenBlock from "@/components/homepage/greenBlock"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Earth Forward - Environmental Intelligence & Guidance",
  description: "Know what's changing. Act with care. Earth Forward turns weather, field reports, news, and place-based history into clear, verified guidance for communities facing environmental risks.",
  keywords: ["environmental", "intelligence", "weather", "community", "guidance", "climate"],
  openGraph: {
    title: "Earth Forward - Environmental Intelligence & Guidance",
    description: "Know what's changing. Act with care.",
    type: "website",
    url: "https://earthforward.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth Forward - Environmental Intelligence & Guidance",
    description: "Know what's changing. Act with care.",
  },
}

export default async function Landing() {
  return (
    <div 
      className="min-h-screen w-full flex flex-col px-4 sm:px-8 md:px-12 py-6 md:py-0 justify-between md:justify-evenly bg-[#E3faeb]"
      role="main"
      aria-label="Earth Forward landing page"
    >
      <header 
        className="justify-between flex py-2"
        role="banner"
        aria-label="Site header with navigation"
      >
        <div className="flex gap-4 items-center">
          <div className="pl-6">
            <Link
              href={"/"}
            >
            <Image 
                src={"/images/logo1.jpeg"}
                alt="Earth Forward logo"
                width={50}
                height={50}
                priority
            />
            </Link>
          </div> 
          <h1 className="text-lg md:text-xl font-bold">Earth Forward</h1>
        </div>
        <Link 
          href={"/riskMap"} 
          aria-label="Explore the environmental system"
        >
          <Button 
            className="group relative cursor-pointer px-8 py-2 text-black overflow-hidden bg-[#C0CCC0] border border-black"
            aria-label="Explore the system button"
          >
            Open System 
          </Button>
          
        </Link>
      </header>

      <main 
        className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 justify-center items-center"
        role="main"
      >
        <div className="flex flex-col justify-start gap-4 px-4 sm:px-8">
            <div 
              className="flex gap-4 flex-wrap tracking-widest"
              aria-label="Content categories"
            >
                <p className="font-thin text-xs tracking-[4px] text-black/90">ENVIRONMENTAL</p>
                <p className="font-thin text-xs tracking-[4px] text-black/90">INTELLIGENCE</p>
            </div>
            <h2 
              className="my-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tighter sm:text-6xl"
              role="heading"
              aria-level={2}
            >
                <span className="block">Know what&apos;s</span>
                <span className="block">changing.</span>
                <span className="block">Act with care</span>
            </h2>
            <div>
                <p className="tracking-wide line-clamp-3">
                Earth Forward turns weather, field reports, news, and place-based history
                into clear, verified guidance for communities facing environmental risks.
                </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <Link 
                  href={"/riskMap"} 
                  aria-label="Explore the environmental system"
                >
                  <Button 
                    className="group relative cursor-pointer px-6 py-2 overflow-hidden"
                    aria-label="Explore the system button"
                  >
                      <span className="inline-block transition-all duration-300 group-hover:opacity-0">
                      Explore the System
                      </span>
                      <ArrowRight 
                        className="absolute scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" 
                        aria-hidden="true"
                      />
                      <ArrowRight className="inline-block transition-all duration-300 group-hover:opacity-0" />
                  </Button>
                </Link>
                <p className="text-black/90 text-xs md:text-xs">See how it works</p>
            </div>
        </div>
        <div 
          className="flex justify-center md:justify-end items-center w-full"
          role="complementary"
          aria-label="Environmental data visualization"
        >
          <GreenBlock />
        </div>
      </main>

      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-black focus:text-white focus:p-4 focus:z-50"
      >
        Skip to main content
      </a>
    </div>
  )
}