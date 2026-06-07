import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location"; // 1. Import this
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* These paths will now work with #/database */}
      <Route path="/" component={HomePage} />
      <Route path="/database" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <TooltipProvider>
          {/* 2. Pass the hook here to enable Hash Routing */}
          <WouterRouter hook={useHashLocation} base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
