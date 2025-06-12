"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, VideoIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="linedev ai logo" />
          <p className="text-2xl font-semibold">Linedev AI</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-100 text-[#5d6d68]" />
      </div>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68] from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      isActive(item.href) &&
                        "bg-linear-to-r/oklch border-[#5d6b68] from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                    )}
                    isActive={isActive(item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-100 text-[#5d6b68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68] from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      isActive(item.href) &&
                        "bg-linear-to-r/oklch border-[#5d6b68] from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                    )}
                    isActive={isActive(item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
