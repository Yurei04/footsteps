import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UpperNav() {
  return (
    <header 
      className="w-full flex items-center justify-between px-8 py-4 mb-8 border-b border-slate-800 h-16"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center gap-4">
        <SidebarTrigger 
          aria-label="Toggle navigation sidebar"
        />
        <h1 
          className="text-xs font-thin text-black tracking-widest uppercase"
          aria-label="Site title: International Environmental Monitoring"
        >
          INTERNATIONAL ENVIRONMENTAL MONITORING
        </h1>
      </div>

      <nav 
        className="flex items-center gap-6"
        aria-label="User actions and profile"
      >
        <Button 
          variant="outline" 
          size="sm"
          aria-label="Quick action button"
        >
          AI Chatbot
        </Button>
        <div 
          className="w-10 h-10 border rounded-full flex items-center justify-center"
          role="img"
          aria-label="User profile avatar"
        >
          <Image
            src="/images/logo1.jpeg"
            alt="Current user avatar"
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