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
import { ChevronDown, Plus, User2, LayoutDashboard, Map, FileText, Brain, Eye, Lightbulb, Target, BookOpen, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

interface DashboardLink {
  title: string
  link: string
  icon: React.ReactNode
}

const dashboardLinks: DashboardLink[] = [
  { title: "Dashboard", link: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: "Risk Map", link: "/risk-map", icon: <Map className="w-4 h-4" /> },
  { title: "Report", link: "/report", icon: <FileText className="w-4 h-4" /> },
  { title: "AI Agent", link: "/ai-agent", icon: <Brain className="w-4 h-4" /> },
  { title: "Monitoring", link: "/monitoring", icon: <Eye className="w-4 h-4" /> },
  { title: "News & Insights", link: "/insights", icon: <Lightbulb className="w-4 h-4" /> },
  { title: "Impact Tracker", link: "/impact", icon: <Target className="w-4 h-4" /> },
  { title: "Resources", link: "/resources", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Settings", link: "/settings", icon: <Settings className="w-4 h-4" /> },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuSubItem>
                    <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                        Select Workspace
                        <ChevronDown className="ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                        <span>Acme Inc</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuSubItem>
            </SidebarMenu>
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
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel render={<CollapsibleTrigger />}>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                </SidebarGroupLabel>
                <CollapsibleContent>
                <SidebarGroupContent />
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  )
}