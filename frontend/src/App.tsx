
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Scans from "./pages/Scans";
import Vulnerabilities from "./pages/Vulnerabilities";
import Tools from "./pages/Tools";
import Remediation from "./pages/Remediation";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Training from "./pages/Training";
import Login from "./pages/Login";
import { SidebarProvider } from "./components/layout/SidebarProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scans" element={<Scans />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/remediation" element={<Remediation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/history" element={<History />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/training" element={<Training />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
