import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Homepage from "./pages/homepage-url-analysis";
import UserDashboard from "./pages/user-dashboard";
import PremiumResults from "./pages/premium-analysis-results";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage (public) */}
        <Route path="/" element={<Homepage />} />
        <Route path="/url-analysis" element={<Homepage />} />

        {/* Auth Pages (public but powered by Clerk) */}
        <Route path="/login" element={<SignIn routing="path" path="/login" />} />
        <Route path="/register" element={<SignUp routing="path" path="/register" />} />

        {/* User Dashboard (signed-in only) */}
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

        {/* Premium Results (signed-in only for now) */}
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

        {/* Catch-all route (redirect to homepage) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
