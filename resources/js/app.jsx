import './bootstrap'; // This is standard for Laravel
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import your main CSS file (where Tailwind is imported)
import '../css/app.css';

// Import the pages we created
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// The main App component now acts as the Router
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect the base URL to the login page */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Define the routes for your pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* You can add a signup route later */}
                {/* <Route path="/signup" element={<SignupPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

// This part stays the same from your old file!
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}