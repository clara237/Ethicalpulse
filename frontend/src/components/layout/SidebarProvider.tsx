
import { ReactNode } from "react";
import { SidebarProvider as ShadcnSidebarProvider } from "@/components/ui/sidebar";

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  return (
    <ShadcnSidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full transition-all duration-300">
        {children}
      </div>
    </ShadcnSidebarProvider>
  );
}
