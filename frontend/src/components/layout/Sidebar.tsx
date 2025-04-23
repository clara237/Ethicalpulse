
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Shield, 
  Zap, 
  FileText, 
  Settings, 
  BarChart2, 
  Database,
  Search,
  AlertTriangle,
  Terminal,
  Menu,
  X,
  ShieldCheck,
  Lock,
  UserCog,
  GraduationCap,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
};

const NavItem = ({ icon: Icon, label, to, isActive }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3 py-2 h-10 mb-1",
          isActive
            ? "bg-sidebar-accent text-orange-500 font-semibold"
            : "hover:bg-sidebar-accent/50 hover:text-orange-500"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive && "text-orange-500")} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  
  const navItems = [
    { icon: Home, label: "Dashboard", to: "/" },
    { icon: Search, label: "Scans", to: "/scans" },
    { icon: AlertTriangle, label: "Vulnérabilités", to: "/vulnerabilities" },
    { icon: ShieldCheck, label: "Remédiation", to: "/remediation" },
    { icon: Terminal, label: "Outils", to: "/tools" },
    { icon: FileText, label: "Rapports", to: "/reports" },
    { icon: Database, label: "Historique", to: "/history" },
    { icon: BarChart2, label: "Analytics", to: "/analytics" },
  ];

  const adminItems = [
    { icon: UserCog, label: "Administration", to: "/admin" },
    { icon: GraduationCap, label: "Formation", to: "/training" },
    { icon: Settings, label: "Paramètres", to: "/settings" },
  ];

  return (
    <motion.div
      className={cn(
        "h-screen bg-sidebar fixed top-0 left-0 z-40 flex flex-col border-r border-sidebar-border transition-all duration-300",
      )}
      initial={false}
      animate={{ width: collapsed ? "4rem" : "16rem" }}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg text-sidebar-foreground">EthicalPulse</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent text-orange-500"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {navItems.map((item) => 
            collapsed ? (
              <Link 
                key={item.to} 
                to={item.to} 
                className={cn(
                  "flex items-center justify-center p-2 rounded-md mb-1",
                  location.pathname === item.to 
                    ? "bg-sidebar-accent text-orange-500" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-orange-500"
                )}
              >
                <item.icon className={cn("h-5 w-5", location.pathname === item.to && "text-orange-500")} />
              </Link>
            ) : (
              <NavItem 
                key={item.to}
                icon={item.icon} 
                label={item.label} 
                to={item.to} 
                isActive={location.pathname === item.to} 
              />
            )
          )}
        </div>
        
        {!collapsed && <Separator className="my-4" />}
        
        <div className="space-y-1 mt-4">
          {adminItems.map((item) => 
            collapsed ? (
              <Link 
                key={item.to} 
                to={item.to} 
                className={cn(
                  "flex items-center justify-center p-2 rounded-md mb-1",
                  location.pathname === item.to 
                    ? "bg-sidebar-accent text-orange-500" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-orange-500"
                )}
              >
                <item.icon className={cn("h-5 w-5", location.pathname === item.to && "text-orange-500")} />
              </Link>
            ) : (
              <NavItem 
                key={item.to}
                icon={item.icon} 
                label={item.label} 
                to={item.to} 
                isActive={location.pathname === item.to} 
              />
            )
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed ? (
          <div className="flex justify-between items-center">
            <div className="text-xs text-sidebar-foreground/70">
              <p>EthicalPulse v1.0</p>
            </div>
            <Link to="/settings/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-sidebar-foreground" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link to="/settings/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-sidebar-foreground" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
