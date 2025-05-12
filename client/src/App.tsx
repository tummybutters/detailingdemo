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
import AdminDashboard from "@/pages/admin-dashboard";
import Layout from "@/components/layout/Layout";

// Import specialized service pages
import InteriorDetailing from "@/pages/services/interior-detailing";
import ExteriorDetailing from "@/pages/services/exterior-detailing";
import CeramicCoating from "@/pages/services/ceramic-coating";
import PaintCorrection from "@/pages/services/paint-correction";

// Import SEO-focused service pages
import InteriorCarDetailing from "@/pages/services/interior-car-detailing";
import FullServiceCarWash from "@/pages/services/full-service-car-wash";
import CarWashAndWax from "@/pages/services/car-wash-and-wax";

// Import location pages for SEO
import DavisCarDetailing from "@/pages/davis-car-detailing";
import WoodlandCarDetailing from "@/pages/woodland-car-detailing";
import DixonCarDetailing from "@/pages/dixon-car-detailing";
import WintersCarDetailing from "@/pages/winters-car-detailing";
import WestSacramentoCarDetailing from "@/pages/west-sacramento-car-detailing";

function Router() {
  return (
    <Switch>
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/services/interior-detailing" component={InteriorDetailing} />
            <Route path="/services/exterior-detailing" component={ExteriorDetailing} />
            <Route path="/services/ceramic-coating" component={CeramicCoating} />
            <Route path="/services/paint-correction" component={PaintCorrection} />
            
            {/* SEO-focused service pages */}
            <Route path="/services/interior-car-detailing" component={InteriorCarDetailing} />
            <Route path="/services/full-service-car-wash" component={FullServiceCarWash} />
            <Route path="/services/car-wash-and-wax" component={CarWashAndWax} />
            <Route path="/booking" component={Booking} />
            <Route path="/about" component={About} />
            <Route path="/subscriptions" component={Subscriptions} />
            <Route path="/contact" component={Contact} />
            <Route path="/card-demo" component={CardDemo} />
            
            {/* Location pages for SEO */}
            <Route path="/davis-car-detailing" component={DavisCarDetailing} />
            <Route path="/woodland-car-detailing" component={WoodlandCarDetailing} />
            <Route path="/dixon-car-detailing" component={DixonCarDetailing} />
            <Route path="/winters-car-detailing" component={WintersCarDetailing} />
            <Route path="/west-sacramento-car-detailing" component={WestSacramentoCarDetailing} />
            
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
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
