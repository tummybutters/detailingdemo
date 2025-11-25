import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OrangeCounty from "@/pages/orange-county";
import Services from "@/pages/services";
import Booking from "@/pages/booking";
import About from "@/pages/about";

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

// Import blog pages
import BlogIndex from "@/pages/blog/index";
import BlogPostPage from "@/pages/blog/[slug]";

// Import location pages for SEO
import DavisCarDetailing from "@/pages/davis-car-detailing";
import SacramentoCarDetailing from "@/pages/sacramento-car-detailing";
import ElkGroveCarDetailing from "@/pages/elk-grove-car-detailing";
import RosevilleCarDetailing from "@/pages/roseville-car-detailing";
import FolsomCarDetailing from "@/pages/folsom-car-detailing";
import WestSacramentoCarDetailing from "@/pages/west-sacramento-car-detailing";
import WoodlandCarDetailing from "@/pages/woodland-car-detailing";

// Import legal pages
import PrivacyPolicy from "@/pages/privacy-policy";
import SmsTerms from "@/pages/sms-terms";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/orange-county" component={OrangeCounty} />
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

            <Route path="/contact" component={Contact} />
            <Route path="/card-demo" component={CardDemo} />
            
            {/* Blog routes */}
            <Route path="/blog" component={BlogIndex} />
            <Route path="/blog/:slug" component={BlogPostPage} />
            
            {/* Location pages for SEO */}
            <Route path="/davis-car-detailing" component={DavisCarDetailing} />
            <Route path="/sacramento-car-detailing" component={SacramentoCarDetailing} />
            <Route path="/elk-grove-car-detailing" component={ElkGroveCarDetailing} />
            <Route path="/roseville-car-detailing" component={RosevilleCarDetailing} />
            <Route path="/folsom-car-detailing" component={FolsomCarDetailing} />
            <Route path="/west-sacramento-car-detailing" component={WestSacramentoCarDetailing} />
            <Route path="/woodland-car-detailing" component={WoodlandCarDetailing} />
            
            {/* Legal pages */}
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/sms-terms" component={SmsTerms} />
            
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
      <ScrollToTop />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
