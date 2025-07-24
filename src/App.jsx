import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Homepage from "./pages/homepage-url-analysis";
import UserDashboard from "./pages/user-dashboard";
import PremiumResults from "./pages/premium-analysis-results";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Private Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <UserDashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Premium Content Route (no payment wall yet) */}
        <Route
          path="/premium"
          element={
            <>
              <SignedIn>
                <PremiumResults />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Redirect unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
