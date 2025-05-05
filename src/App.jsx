// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Favourite from './pages/Favourite';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CursorHighlight from './components/CursorHighlight';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import CountryDetails from './components/CountryDetails';
function App() {

  
  return (
    <Router>
       <ToastContainer />
      <CursorHighlight/>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4">
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country" element={<CountryPage />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/sign-up" element={< Signup/>} />
            <Route path="/country-details/:code" element={< CountryDetails/>} />            
            <Route path="/sign-in" element={< Signin/>} />
            <Route path="/profile" element={< Profile/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
