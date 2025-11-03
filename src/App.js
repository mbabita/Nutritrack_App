// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import TrackingPage from './components/TrackingPage';
import Dashboard from './components/Dashboard';
import RecipesPage from './components/RecipesPage';
import MealKitsPage from './components/MealKitsPage';
import UserProfile from './components/UserProfile';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import HomePage from './components/HomePage';
import PaymentPage from './pages/PaymentPage';

import './App.css'; // Assume you have a global CSS file

const App = () => {
  // Simple state to manage which section is active
  const [activeSection, setActiveSection] = useState('Dashboard'); // Or 'Tracking', 'My Plan', etc.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const MainApp = () => (
    <AppProvider>
      <div style={styles.appContainer}>
        <main style={styles.mainContent}>
          {activeSection === 'Dashboard' && <Dashboard setActiveSection={setActiveSection} />}
          {activeSection === 'Tracking' && <TrackingPage setActiveSection={setActiveSection} />}
          {activeSection === 'Recipes' && <RecipesPage setActiveSection={setActiveSection} />}
          {activeSection === 'Meal Kits' && <MealKitsPage setActiveSection={setActiveSection} />}
          {activeSection === 'Profile' && <UserProfile setActiveSection={setActiveSection} />}
        </main>
      </div>
    </AppProvider>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<MainApp />} />
      </Routes>

    </Router>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#E8F5E9',
    padding: '10px 20px',
    borderBottom: '2px solid #C8E6C9',
  },
  navButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#387c53',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  navButtonActive: {
    backgroundColor: '#C8E6C9',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#1B5E20',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
  },
  placeholder: {
    textAlign: 'center',
    marginTop: '50px',
    color: '#387c53',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#387c53',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
    padding: '5px 0',
  }
};

export default App;
