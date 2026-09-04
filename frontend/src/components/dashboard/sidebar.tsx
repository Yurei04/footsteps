import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronDown, Plus, User2, LayoutDashboard, Map, FileText, Brain, Eye, Lightbulb, Target, BookOpen, Settings, SidebarIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import Image from "next/image"

interface DashboardLink {
  title: string
  link: string
  icon: React.ReactNode
}

const dashboardLinks: DashboardLink[] = [
  { title: "Dashboard", link: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: "Risk Map", link: "/riskMap", icon: <Map className="w-4 h-4" /> },
  { title: "Report", link: "/report", icon: <FileText className="w-4 h-4" /> },
  { title: "AI Agent", link: "/ai-agent", icon: <Brain className="w-4 h-4" /> },
  { title: "Monitoring", link: "/monitoring", icon: <Eye className="w-4 h-4" /> },
  { title: "News & Insights", link: "/newFeed", icon: <Lightbulb className="w-4 h-4" /> },
  { title: "Impact Tracker", link: "/impact", icon: <Target className="w-4 h-4" /> },
  { title: "Resources", link: "/resources", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Settings", link: "/settings", icon: <Settings className="w-4 h-4" /> },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/images/logo1.jpeg"
              alt="Earth Forward logo"
              width={50}
              height={50}
              className="rounded-2xl"
              priority
            />

            <div className="flex flex-col">
              <h1 className="font-semibold">Earth Forward</h1>
              <p className="text-sm text-muted-foreground">
                Intelligence System
              </p>
            </div>
          </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            {dashboardLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<a href={item.link} />}>
                    {item.icon}
                    <span>{item.title}</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}