import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OurStory from "@/pages/our-story";
import Join from "@/pages/join";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import Portfolio from "@/pages/portfolio";
import TeamPage from "@/pages/team";

const PORTFOLIO_SLUGS = ["fatema", "shaili", "aakanksha"];

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/join" component={Join} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/team" component={TeamPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        {PORTFOLIO_SLUGS.map((slug) => (
          <Route key={slug} path={`/${slug}`} component={Portfolio} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
