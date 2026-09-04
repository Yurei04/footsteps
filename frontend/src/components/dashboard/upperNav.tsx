import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UpperNav() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 mb-8 border-b border-slate-800 h-16">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold text-black">Dashboard</h1>
      </div>

      <nav className="flex items-center gap-6">
        <Button variant="outline" size="sm">
          Action
        </Button>
        <div className="w-10 h-10 border rounded-full flex items-center justify-center">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
        </div>
      </nav>
    </header>
  );
}