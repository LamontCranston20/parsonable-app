import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomepageUrlAnalysis from "pages/homepage-url-analysis";
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import UserDashboard from "pages/user-dashboard";
import AccountSettings from "pages/account-settings";
import PremiumAnalysisResults from "pages/premium-analysis-results";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomepageUrlAnalysis />} />
        <Route path="/homepage-url-analysis" element={<HomepageUrlAnalysis />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/premium-analysis-results" element={<PremiumAnalysisResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;