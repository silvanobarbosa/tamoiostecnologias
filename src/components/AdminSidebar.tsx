import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Mail,
  Megaphone,
  Users,
  Settings,
  ExternalLink,
  ShieldCheck,
  Layout,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import logoTamoios from "@/assets/tamoios-logo.png";

const groups = [
  {
    label: "Visão geral",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: "Conteúdo",
    items: [
      { title: "Páginas", url: "/admin/pages", icon: Layout, end: false },
      { title: "Posts", url: "/admin/posts", icon: FileText, end: false },
      { title: "Novo post", url: "/admin/posts/new", icon: PlusCircle, end: false },
    ],
  },
  {
    label: "Relacionamento",
    items: [
      { title: "Mensagens", url: "/admin/messages", icon: Mail, end: false },
      { title: "Newsletter", url: "/admin/subscribers", icon: Megaphone, end: false },
    ],
  },
  {
    label: "Equipe & Conta",
    items: [
      { title: "Administradores", url: "/admin/team", icon: Users, end: false },
      { title: "Conta", url: "/admin/account", icon: Settings, end: false },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <NavLink to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="bg-background rounded-lg p-1.5 shadow-sm">
            <img src={logoTamoios} alt="Tamoios" className="h-7 w-auto" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-sidebar-foreground">Tamoios</span>
              <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">
                Painel admin
              </span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = item.end
                    ? pathname === item.url
                    : pathname === item.url || pathname.startsWith(`${item.url}/`);
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <NavLink to={item.url} end={item.end} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ver site">
              <NavLink to="/" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {!collapsed && <span>Ver site público</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Admin">
              <ShieldCheck className="h-4 w-4 text-leaf" />
              {!collapsed && <span className="text-xs text-sidebar-foreground/70">Acesso restrito</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
