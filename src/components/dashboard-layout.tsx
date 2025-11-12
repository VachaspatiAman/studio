"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Video,
  Users,
  LayoutDashboard,
  BarChart3,
  UserCog,
  GraduationCap,
  LogOut,
  Bot,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export type Role = "student" | "mentor" | "admin";

interface DashboardLayoutProps {
  children: ReactNode;
  role: Role;
}

const navLinks: Record<Role, { href: string; label: string; icon: ReactNode }[]> = {
  student: [
    { href: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/student/courses", label: "Courses", icon: <BookOpen /> },
    { href: "/student/practice", label: "Practice", icon: <Code2 /> },
    { href: "/student/videos", label: "Videos", icon: <Video /> },
    { href: "/student/mentors", label: "Mentors", icon: <Users /> },
    { href: "/student/recommendations", label: "Recommendations", icon: <Bot /> },
  ],
  mentor: [
    { href: "/mentor/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/mentor/courses", label: "My Courses", icon: <BookOpen /> },
    { href: "/mentor/problems", label: "My Problems", icon: <Code2 /> },
    { href: "/mentor/analytics", label: "Analytics", icon: <BarChart3 /> },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin/users", label: "Users", icon: <Users /> },
    { href: "/admin/roles", label: "Role Management", icon: <UserCog /> },
    { href: "/admin/analytics", label: "Platform Analytics", icon: <BarChart3 /> },
  ],
};

const userDetails: Record<Role, { name: string; email: string }> = {
  student: { name: "Alex Doe", email: "alex.doe@example.com" },
  mentor: { name: "Dr. Jane Smith", email: "jane.smith@example.com" },
  admin: { name: "Admin User", email: "admin@learnverse.com" },
};

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const links = navLinks[role];
  const user = userDetails[role];

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 p-2" aria-label="Home">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </div>
            <span className="font-headline text-lg font-semibold">LearnVerse</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href}>
                  <SidebarMenuButton isActive={pathname === link.href} tooltip={{children: link.label}}>
                    {link.icon}
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2 group-data-[collapsible=icon]:hidden">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                   <Avatar className="size-7">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">{user.name}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings"><Settings className="mr-2"/> Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/"><LogOut className="mr-2"/> Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
           <div className="hidden p-2 group-data-[collapsible=icon]:block">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Avatar className="size-8 cursor-pointer">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2" side="right" align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings"><Settings className="mr-2"/> Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/"><LogOut className="mr-2"/> Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex items-center gap-2">
              {/* Add any header items here */}
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
