import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BandejasFLV from "./pages/produtos/BandejasFLV.tsx";
import CalcosTecnicos from "./pages/produtos/CalcosTecnicos.tsx";
import AgroFlorestal from "./pages/produtos/AgroFlorestal.tsx";
import Auth from "./pages/Auth.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import QuemSomos from "./pages/QuemSomos.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import NewPost from "./pages/admin/NewPost.tsx";
import AdminSubscribers from "./pages/admin/AdminSubscribers.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos/bandejas-flv" element={<BandejasFLV />} />
            <Route path="/produtos/calcos-tecnicos" element={<CalcosTecnicos />} />
            <Route path="/produtos/agro-florestal" element={<AgroFlorestal />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/posts/new" element={<NewPost />} />
            <Route path="/admin/subscribers" element={<AdminSubscribers />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
