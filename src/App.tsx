
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import ReadyKitchens from "./pages/ReadyKitchens";
import Constructor from "./pages/Constructor";
import KitchenDetails from "./pages/KitchenDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import MaterialsAdmin from "./pages/admin/MaterialsAdmin";
import KitchensAdmin from "./pages/admin/KitchensAdmin";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/ready-kitchens" element={<ReadyKitchens />} />
              <Route path="/constructor" element={<Constructor />} />
              <Route path="/kitchen/:id" element={<KitchenDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/admin/materials" element={<MaterialsAdmin />} />
              <Route path="/admin/kitchens" element={<KitchensAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
