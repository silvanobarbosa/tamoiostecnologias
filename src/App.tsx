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
import PoliticasNacionais from "./pages/PoliticasNacionais.tsx";
import Materiais from "./pages/Materiais.tsx";
import Imprensa from "./pages/Imprensa.tsx";
import Cases from "./pages/Cases.tsx";
import ApresentacaoInstitucional from "./pages/ApresentacaoInstitucional.tsx";
import ApresentacaoProdutos from "./pages/ApresentacaoProdutos.tsx";
import SejaRepresentante from "./pages/SejaRepresentante.tsx";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { FloatingContact } from "./components/FloatingContact.tsx";
import { FloatingRepresentative } from "./components/FloatingRepresentative.tsx";

import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Overview from "./pages/admin/Overview.tsx";
import PostsAdmin from "./pages/admin/PostsAdmin.tsx";
import PostEditor from "./pages/admin/PostEditor.tsx";
import AdminSubscribers from "./pages/admin/AdminSubscribers.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";
import TeamAdmin from "./pages/admin/TeamAdmin.tsx";
import Account from "./pages/admin/Account.tsx";
import PagesAdmin from "./pages/admin/PagesAdmin.tsx";
import PageEditor from "./pages/admin/PageEditor.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos/bandejas-flv" element={<BandejasFLV />} />
            <Route path="/produtos/calcos-tecnicos" element={<CalcosTecnicos />} />
            <Route path="/produtos/agro-florestal" element={<AgroFlorestal />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/politicas-nacionais" element={<PoliticasNacionais />} />
            <Route path="/materiais" element={<Materiais />} />
            <Route path="/imprensa" element={<Imprensa />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/apresentacao" element={<ApresentacaoInstitucional />} />
            <Route path="/apresentacao-produtos" element={<ApresentacaoProdutos />} />
            <Route path="/seja-representante" element={<SejaRepresentante />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="pages" element={<PagesAdmin />} />
              <Route path="pages/:slug" element={<PageEditor />} />
              <Route path="posts" element={<PostsAdmin />} />
              <Route path="posts/new" element={<PostEditor />} />
              <Route path="posts/:id/edit" element={<PostEditor />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingContact />
          <FloatingRepresentative />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
