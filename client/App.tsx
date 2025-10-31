import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Planning from "./pages/Planning";
import Projecten from "./pages/Projecten";
import Documenten from "./pages/Documenten";
import Berichten from "./pages/Berichten";
import Instellingen from "./pages/Instellingen";
import CustomerPortal from "./pages/CustomerPortal";
import Feedback from "./pages/Feedback";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/projecten" element={<Projecten />} />
          <Route path="/documenten" element={<Documenten />} />
          <Route path="/berichten" element={<Berichten />} />
          <Route path="/instellingen" element={<Instellingen />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/customer" element={<CustomerPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
