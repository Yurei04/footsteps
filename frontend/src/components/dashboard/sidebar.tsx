import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronDown, Plus, User2, LayoutDashboard, Map, FileText, Brain, Eye, Lightbulb, Target, BookOpen, Settings, SidebarIcon } from "lucide-react"
import Image from "next/image"

interface DashboardLink {
  title: string
  link: string
  icon: React.ReactNode
}

const dashboardLinks: DashboardLink[] = [
  { title: "Dashboard", link: "/riskMap", icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: "Risk Map", link: "/riskMap", icon: <Map className="w-4 h-4" /> },
  { title: "Report", link: "/reports", icon: <FileText className="w-4 h-4" /> },
  { title: "AI Agent", link: "/aiAgent", icon: <Brain className="w-4 h-4" /> },
  { title: "Monitoring", link: "/monitoring", icon: <Eye className="w-4 h-4" /> },
  { title: "News & Insights", link: "/newFeed", icon: <Lightbulb className="w-4 h-4" /> },
  { title: "Impact Tracker", link: "/impactTracker", icon: <Target className="w-4 h-4" /> },
  { title: "Resources", link: "/resources", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Settings", link: "/settings", icon: <Settings className="w-4 h-4" /> },
]

export function AppSidebar() {
  return (
    <Sidebar 
      variant="floating"
      aria-label="Application navigation sidebar"
    >
      <SidebarHeader>
        <div 
          className="flex items-center gap-3 mb-2"
          role="region"
          aria-label="Application branding"
        >
          <Image
            src="/images/logo1.jpeg"
            alt="Earth Forward logo"
            width={50}
            height={50}
            className="rounded-2xl"
            priority
          />

          <div className="flex flex-col">
            <h1 
              className="font-semibold"
              id="app-title"
            >
              Earth Forward
            </h1>
            <p 
              className="text-sm text-muted-foreground"
              aria-label="Application subtitle"
            >
              Intelligence System
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <nav 
            role="navigation"
            aria-label="Main navigation menu"
            aria-describedby="nav-description"
          >
            <p id="nav-description" className="sr-only">
              Navigate between different sections of the Earth Forward environmental monitoring system.
            </p>
            
            <ul role="list">
              {dashboardLinks.map((item) => (
                <SidebarMenuItem 
                  key={item.title}
                  role="listitem"
                >
                  <SidebarMenuButton 
                    render={<a href={item.link} />}
                    aria-label={`Navigate to ${item.title}`}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <span 
                      aria-hidden="true"
                      className="flex-shrink-0"
                    >
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </ul>
          </nav>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}