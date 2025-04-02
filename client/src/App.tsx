import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Booking from "@/pages/booking";
import About from "@/pages/about";
import Subscriptions from "@/pages/subscriptions";
import Contact from "@/pages/contact";
import CardDemo from "@/pages/card-demo";
import Layout from "@/components/layout/Layout";

// Import specialized service pages
import InteriorDetailing from "@/pages/services/interior-detailing";
import ExteriorDetailing from "@/pages/services/exterior-detailing";
import CeramicCoating from "@/pages/services/ceramic-coating";
import PaintCorrection from "@/pages/services/paint-correction";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/interior-detailing" component={InteriorDetailing} />
        <Route path="/services/exterior-detailing" component={ExteriorDetailing} />
        <Route path="/services/ceramic-coating" component={CeramicCoating} />
        <Route path="/services/paint-correction" component={PaintCorrection} />
        <Route path="/booking" component={Booking} />
        <Route path="/about" component={About} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/contact" component={Contact} />
        <Route path="/card-demo" component={CardDemo} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
