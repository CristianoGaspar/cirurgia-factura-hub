import { useState } from "react"
import { 
  BarChart3, 
  Stethoscope, 
  FileText, 
  CreditCard, 
  Users, 
  Settings,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Procedimentos", url: "/procedures", icon: Stethoscope },
  { title: "Cirurgias", url: "/surgeries", icon: FileText },
  { title: "Faturas", url: "/invoices", icon: CreditCard },
  { title: "Pacientes", url: "/patients", icon: Users },
]

const configItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname
  const [mainGroupOpen, setMainGroupOpen] = useState(true)
  const [configGroupOpen, setConfigGroupOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-sm" 
        : "hover:bg-muted/50 hover:text-foreground"
    }`

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-14" : "w-64"} border-r border-border`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">HospitalSys</span>
              <span className="text-xs text-muted-foreground">Faturamento</span>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-2 py-1 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {!collapsed && "Principal"}
            </span>
            {!collapsed && (
              <button
                onClick={() => setMainGroupOpen(!mainGroupOpen)}
                className="p-0.5 hover:bg-muted rounded"
              >
                {mainGroupOpen ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </SidebarGroupLabel>

          {(mainGroupOpen || collapsed) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"} 
                        className={getNavCls({ isActive: isActive(item.url) })}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="flex items-center justify-between px-2 py-1 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {!collapsed && "Sistema"}
            </span>
            {!collapsed && (
              <button
                onClick={() => setConfigGroupOpen(!configGroupOpen)}
                className="p-0.5 hover:bg-muted rounded"
              >
                {configGroupOpen ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </SidebarGroupLabel>

          {(configGroupOpen || collapsed) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {configItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink 
                        to={item.url} 
                        className={getNavCls({ isActive: isActive(item.url) })}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}