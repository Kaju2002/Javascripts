// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import Favourite from "./pages/Favourite";
//import Signin from './components/Signin';
//import Signup from './components/Signup';
//import Profile from "./components/Profile";
import CursorHighlight from "./components/CursorHighlight";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CountryDetails from "./components/CountryDetails";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserProfile,
} from "@clerk/clerk-react";
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
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/country-details/:code" element={<CountryDetails />} />
            <Route
              path="/sign-in/*"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                  {" "}
                  {/* Adjust min-h as needed */}
                  <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                  {" "}
                  {/* Adjust min-h as needed */}
                  <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
                </div>
              }
            />
            <Route
              path="/profile/*" // Note the "/*"
              element={
                // --- CHANGE: Added Centering Wrapper Div ---
                <div className="flex justify-center py-8 mb-10"> {/* py-4 adds some top/bottom padding */}
                  <SignedIn>
                      {/* You might want to add max-width to UserProfile via appearance prop if needed */}
                      <UserProfile path="/profile" routing="path" appearance={{
                          // Optional: Add custom styles if needed, e.g., max width
                          // elements: {
                          //   card: "mx-auto max-w-4xl" // Example: Center card within flex and limit width
                          // }
                      }} />
                  </SignedIn>
                  <SignedOut>
                    {/* RedirectToSignIn doesn't need centering, it just navigates away */}
                    <RedirectToSignIn redirectUrl={window.location.pathname + window.location.search} />
                  </SignedOut>
                </div>
                // --- END CHANGE ---
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
