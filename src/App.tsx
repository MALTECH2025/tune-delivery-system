
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import AdminGuard from "./components/AdminGuard";
import Distribute from "./pages/Distribute";
import Copyright from "./pages/Copyright";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import Withdraw from "./pages/Withdraw";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import SubscriptionGuard from "./components/SubscriptionGuard";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <AuthGuard>
                      <SubscriptionGuard>
                        <Dashboard />
                      </SubscriptionGuard>
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <AuthGuard>
                      <SubscriptionGuard>
                        <Settings />
                      </SubscriptionGuard>
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/distribute" 
                  element={
                    <AuthGuard>
                      <SubscriptionGuard>
                        <Distribute />
                      </SubscriptionGuard>
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/withdraw" 
                  element={
                    <AuthGuard>
                      <SubscriptionGuard>
                        <Withdraw />
                      </SubscriptionGuard>
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <AdminGuard>
                      <Admin />
                    </AdminGuard>
                  } 
                />
                <Route path="/copyright" element={<Copyright />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/support" element={<Support />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
