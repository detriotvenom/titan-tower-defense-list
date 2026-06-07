import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

// Import your pages and components
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import Home from "@/pages/home"; // Your Value List page
import Admin from "@/pages/admin";
import { TradeCalculator } from "@/pages/Calculator"; // Import your new Calculator
import { Navbar } from "@/components/Navbar"; // Import your new Navbar

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      {/* Navbar sits inside the router so links work correctly */}
      <Navbar />
      
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/database" component={Home} />
        <Route path="/calculator" component={TradeCalculator} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <TooltipProvider>
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
