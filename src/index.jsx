import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import './styles/tailwind.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter> {/* ✅ Wrap App in this */}
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
