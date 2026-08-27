// Landing.tsx (PAGE - NO "use client" needed!)
import GreenBlock from "@/components/homepage/greenBlock"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function Landing() {
  return (
    <div className="h-screen w-full flex flex-col px-12 justify-evenly bg-[#E3faeb]">
      <header className="justify-between flex py-2">
        <div className="flex gap-4 items-center">
          <div className="pl-6">
            <Image 
                src={"/globe.svg"}
                alt="Logo"
                width={50}
                height={50}
                priority
            />
          </div> 
          <h1 className="text-lg md:text-xl text-bold">Earth Forward</h1>
        </div>
        <Link href="/system">
          <Button className="cursor-pointer rounded-4xl px-8 py-4 border-black bg-red-50 text-black">Open System</Button>
        </Link>
      </header>

      <main className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 justify-center items-center">
        <div className="flex flex-col justify-start gap-4 px-8">
            <div className="flex gap-8">
                <p className="font-thin text-black/50">ENVIRONMENTAL</p>
                <p className="font-thin text-black/50">INTELLIGENCE</p>
            </div>
            <h1 className="my-6 text-6xl font-bold leading-tighter sm:text-6xl">
                <span className="block">Know what&apos;s</span>
                <span className="block">changing.</span>
                <span className="block">Act with care</span>
            </h1>
            <div>
                <p className="leading-tight line-clamp-3">
                Earth Forward turns weather, field reports, news, and place-based history
                into clear, verified guidance for communities facing environmental risks.
                </p>
            </div>
            <div className="mt-6 flex items-center gap-8">
                <Link href={"/"}>
                  <Button className="group relative cursor-pointer px-6 py-2 overflow-hidden">
                      <span className="inline-block transition-all duration-300 group-hover:opacity-0">
                      Explore the System
                      </span>
                      <ArrowRight className="absolute scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                      <ArrowRight className="inline-block transition-all duration-300 group-hover:opacity-0" />
                  </Button>
                </Link>
                <p className="text-black/50 text-md md:text-md">See how it works</p>
            </div>
        </div>
        <div className="flex justify-end items-center">
          <GreenBlock />
        </div>
      </main>
    </div>
  )
}