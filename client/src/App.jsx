import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Panel from "./components/Panel";
import AboutDonation from "./components/Aboutdonation";
import Footer from "./components/Footer";
import WLogin from './components/WLogin';
import Contact from "./components/Contact";
import WSignup from "./components/WSignup";
import BloodRequest from "./components/BloodRequest";
import AboutSection from "./components/About";
import MythFactCarousel from './components/MythFactCarousel';
import DonateBlood from './components/DonateBlood';
import BenefitsCarousel from './components/BenefitsCarousel';
import DonorList from './components/DonorList';
import Card from './components/Card';
import Myths from './components/Myths.jsx';
import Registert from "./components/Registert.jsx";
import Logint from "./components/Logint";
import DonationList from "./components/DonationList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/register" element={<Registert />} />
            <Route path="/login" element={<Logint setIsAuthenticated={setIsAuthenticated} />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={
                  <div>
                    <Hero />
                    <AboutDonation />
                    <Card />
                    <Panel />
                    <AboutSection />
                    <div className="container mx-auto py-8">
                      <BenefitsCarousel />
                    </div>
                    <MythFactCarousel />
                    <div className="container mx-auto py-8">
                      <Myths />
                    </div>
                    <Contact />
                  </div>
                } />
                <Route path="/about" element={<AboutDonation />} />
                <Route path="/LookingBlood" element={<BloodRequest />} />
                <Route path="/DonorList" element={<DonorList />} />
                <Route path="/donation" element={<Contact />} />
                <Route path="/DonateBlood" element={<DonateBlood />} />
                <Route path="/WSignup" element={<WSignup />} />
                <Route path="/Signup" element={<div><Hero /><AboutDonation /><Panel /></div>} />
                <Route path="/dLogin" element={<WLogin />} />
                <Route path="/DonationList" element={<DonationList />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
