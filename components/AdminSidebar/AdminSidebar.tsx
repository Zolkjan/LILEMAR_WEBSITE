"use client";

import { useAuth } from "@/context/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroupLabel,
  useSidebar,
} from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Users, TableProperties } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

const AdminSidebar = () => {
  const auth = useAuth();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  const [mounted, setMounted] = useState(false);

  const navigationPaths = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Portfolio", url: "/admin/portfolio", icon: TableProperties },
  ];

  const isSelected = (url: string) => pathname === url;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader
        className={cn(
          "flex h-20 items-center border-b border-border/40 transition-all duration-300",
          isCollapsed ? "justify-center px-2" : "justify-center px-6",
        )}
      >
        <Link href="/admin" className="flex items-center">
          {isCollapsed ? (
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/logo/Sygnet_lilemar_jasny.svg"
                  : "/logo/Sygnet_lilemar_ciemny.svg"
              }
              alt="Lilemar logo"
              width={40}
              height={40}
              className="w-auto h-10 transition-all"
              priority
            />
          ) : (
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/logo/Lilemar_poziomo_jasne.svg"
                  : "/logo/Lilemar_poziomo_ciemne.svg"
              }
              alt="Lilemar logo"
              width={140}
              height={35}
              className="w-auto h-8 transition-all"
              priority
            />
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className=" py-4">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Zarządzanie
            </SidebarGroupLabel>
          )}
          <SidebarMenu className="gap-1 mt-2">
            <TooltipProvider delayDuration={0}>
              {navigationPaths.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isSelected(item.url)}
                        className={cn(
                          "h-11 w-full rounded-lg transition-all duration-200 group",
                          isCollapsed
                            ? "justify-center p-0"
                            : "px-4 justify-start",
                          isSelected(item.url)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent",
                        )}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center w-full"
                        >
                          <item.icon
                            className={cn(
                              "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                              isCollapsed ? "mx-auto" : "mr-3",
                              isSelected(item.url)
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          {!isCollapsed && (
                            <span className="font-medium truncate">
                              {item.title}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="font-medium">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </TooltipProvider>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => auth?.logout().then(() => router.push("/login"))}
              className={cn(
                "h-11 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group",
                isCollapsed ? "justify-center px-0" : "px-4",
              )}
            >
              <LogOut
                className={cn(
                  "w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-0.5",
                  !isCollapsed && "mr-3",
                )}
              />
              {!isCollapsed && <span className="font-medium">Wyloguj się</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
