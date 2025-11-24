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
import Personeel from "./pages/Personeel";
import Berichten from "./pages/Berichten";
import Prodist from "./pages/Prodist";
import Instellingen from "./pages/Instellingen";
import Automatiseringen from "./pages/Automatiseringen";
import Innovatie from "./pages/Innovatie";
import CustomerPortal from "./pages/CustomerPortal";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjecten from "./pages/AdminProjecten";
import AdminMedewerkers from "./pages/AdminMedewerkers";
import AdminFeedback from "./pages/AdminFeedback";
import AdminInstellingen from "./pages/AdminInstellingen";
import ClockinDetail from "./pages/ClockinDetail";

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
          <Route path="/personeel" element={<Personeel />} />
          <Route path="/berichten" element={<Berichten />} />
          <Route path="/prodist" element={<Prodist />} />
          <Route path="/automatiseringen" element={<Automatiseringen />} />
          <Route path="/innovatie" element={<Innovatie />} />
          <Route path="/instellingen" element={<Instellingen />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/customer" element={<CustomerPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projecten" element={<AdminProjecten />} />
          <Route path="/admin/medewerkers" element={<AdminMedewerkers />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/admin/instellingen" element={<AdminInstellingen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
