import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Procedures from "./pages/Procedures";
import Surgeries from "./pages/Surgeries";
import Invoices from "./pages/Invoices";
import Patients from "./pages/Patients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {/* Header with trigger */}
            <header className="fixed top-0 left-0 right-0 h-14 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
              <SidebarTrigger className="ml-4" />
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-lg font-semibold text-foreground">Sistema Hospitalar - Faturamento</h2>
              </div>
            </header>

            <AppSidebar />

            <main className="flex-1 pt-14">
              <div className="container mx-auto p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/procedures" element={<Procedures />} />
                  <Route path="/surgeries" element={<Surgeries />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
