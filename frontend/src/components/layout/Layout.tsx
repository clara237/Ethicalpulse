
import React from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useSidebar();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Navbar />
      <main className={cn(
        "pt-16 transition-all duration-300 ease-in-out",
        state === "expanded" ? "pl-64" : "pl-16"
      )}>
        <div className="container py-6 px-6 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
