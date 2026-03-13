import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import VehicleDetails from "./pages/VehicleDetails";
import Compare from "./pages/Compare";
import Financing from "./pages/Financing";
import TradeIn from "./pages/TradeIn";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import HomePreview from "./pages/HomePreview";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isHomePreview = location.pathname === "/home-preview";

  return (
    <>
      {!isHomePreview && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home-preview" element={<HomePreview />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/financing" element={<Financing />} />
        <Route path="/trade-in" element={<TradeIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isHomePreview && <Footer />}
      {!isHomePreview && <MobileNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
