// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import Favourite from "./pages/Favourite"; // Your Favourite.jsx component
import CursorHighlight from "./components/CursorHighlight";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify"; // toast is usually called within components, not globally here
import CountryDetails from "./components/CountryDetails";
// Clerk imports
import {
  SignedIn, // Keep for other routes if needed
  SignedOut, // Keep for other routes if needed
  RedirectToSignIn, // Keep for other routes if needed
  SignIn,
  SignUp,
  UserProfile,
} from "@clerk/clerk-react";

// NOTE: ClerkProvider should be in main.jsx/index.js, not here, if it isn't already.
// If ClerkProvider is here, it's fine, but usually it's one level higher.

function App() {
  return (
    <Router>
      <ToastContainer />
      <CursorHighlight />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country" element={<CountryPage />} />

            {/* ========== THIS IS THE CORRECTED ROUTE ========== */}
            <Route
              path="/favourite"
              element={<Favourite />} // Render Favourite component directly
                                      // It will handle its own auth check and prompt
            />
            {/* ================================================ */}

            <Route path="/country-details/:code" element={<CountryDetails />} />
            <Route
              path="/sign-in/*"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                  <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" redirectUrl="/" /> {/* Added redirectUrl */}
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                  <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" redirectUrl="/" /> {/* Added redirectUrl */}
                </div>
              }
            />
            <Route
              path="/profile/*"
              element={
                <div className="flex justify-center py-8 mb-10">
                  <SignedIn>
                    <UserProfile path="/profile" routing="path" appearance={{/* ... */}} />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn redirectUrl={window.location.pathname + window.location.search} />
                  </SignedOut>
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;