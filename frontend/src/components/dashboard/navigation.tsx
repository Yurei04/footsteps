"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Map,
  FileText,
  Brain,
  Eye,
  Lightbulb,
  Target,
  BookOpen,
  Settings,
  ChevronLeft,
  X,
  Menu,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"

interface DashboardLink {
  title: string
  link: string
  icon: React.ReactNode
}

interface CombinedNavigationProps {
  children: React.ReactNode
}

const dashboardLinks: DashboardLink[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    title: "Risk Map",
    link: "/riskMap",
    icon: <Map className="w-4 h-4" />,
  },
  {
    title: "Report",
    link: "/reports",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    title: "AI Agent",
    link: "/aiAgent",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    title: "News & Insights",
    link: "/newFeed",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    title: "Resources",
    link: "/resources",
    icon: <BookOpen className="w-4 h-4" />,
  },
]

export function CombinedNavigation({
  children,
}: CombinedNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Navigation */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border"
        role="banner"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 py-3 h-16">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              aria-label="Ask AI"
            >
              Ask AI
            </Button>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border overflow-hidden"
              role="img"
              aria-label="User profile"
            >
              <Image
                src="/images/logo1.jpeg"
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            className="bg-background border-t border-border"
            role="navigation"
            aria-label="Main navigation menu"
          >
            <ul className="flex flex-col py-2">
              {dashboardLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-muted-foreground flex-shrink-0">
                      {item.icon}
                    </span>

                    <span className="text-sm font-medium">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Mobile content spacing */}
      <div className="lg:hidden pt-16">
        <main className="min-h-screen w-full">
          {children}
        </main>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex min-h-screen">
        <aside
          className={`fixed left-0 top-0 h-screen bg-background border-r border-border transition-all duration-300 z-40 flex flex-col ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
          role="complementary"
          aria-label="Application sidebar"
        >
          {/* Sidebar Header */}
          <div className="px-4 py-6 border-b border-border flex items-center justify-between">
            {sidebarOpen ? (
              <Link
                href="/"
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/images/logo1.jpeg"
                    alt="Earth Forward logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    priority
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <h2 className="font-semibold text-foreground text-sm">
                    Earth Forward
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Intelligence
                  </p>
                </div>
              </Link>
            ) : (
              <Image
                src="/images/logo1.jpeg"
                alt="Earth Forward logo"
                width={32}
                height={32}
                className="rounded-lg mx-auto"
                priority
              />
            )}
          </div>

          <nav
            className="flex-1 overflow-y-auto px-2 py-4"
            role="navigation"
            aria-label="Main menu"
          >
            <ul className="space-y-2">
              {dashboardLinks.map((item) => {
                const isActive = pathname === item.link

                return (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                        isActive
                          ? "bg-card text-primary"
                          : "text-foreground hover:bg-secondary"
                      } ${
                        sidebarOpen
                          ? "px-3"
                          : "px-0 justify-center"
                      }`}
                      title={!sidebarOpen ? item.title : undefined}
                    >
                      <span
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {sidebarOpen && (
                        <span className="truncate">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Sidebar Collapse Button */}
          <div className="border-t border-border p-2 mt-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center py-2 px-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronLeft
                className={`w-5 h-5 transition-transform ${
                  !sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </aside>

        {/* Main Desktop Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          {/* Desktop Top Navigation */}
          <header
            className="sticky top-0 flex items-center justify-between px-8 py-4 border-b border-border h-16 bg-background z-30"
            role="banner"
            aria-label="Desktop navigation"
          >
            <h1
              className="text-xs font-thin text-muted-foreground tracking-widest uppercase"
              aria-label="Earth Forward Intelligence System"
            >
              Earth Forward Intelligence System
            </h1>

            <nav
              className="flex items-center gap-6"
              aria-label="User actions"
            >
              <ThemeToggle />

              <Button
                variant="ghost"
                size="sm"
                aria-label="Ask AI"
              >
                Ask AI
              </Button>

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border border-border overflow-hidden"
                role="img"
                aria-label="User profile"
              >
                <Image
                  src="/images/logo1.jpeg"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
              </div>
            </nav>
          </header>

          {/* Page Content */}
          <main className="flex-1 min-w-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}