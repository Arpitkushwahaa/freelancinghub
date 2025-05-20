import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/common/Navbar';

// Pages
import Home from './pages/Home';
import ExplorePage from './pages/ExplorePage';
import ProjectDetails from './pages/ProjectDetails';
import PostProject from './pages/PostProject';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import HowItWorks from './pages/HowItWorks';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'client' | 'freelancer' }) => {
  const auth = { isAuthenticated: localStorage.getItem('currentUser') !== null };
  const user = auth.isAuthenticated ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/project/:projectId" element={<ProjectDetails />} />
                <Route 
                  path="/post-project" 
                  element={
                    <ProtectedRoute requiredRole="client">
                      <PostProject />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route 
                  path="/client-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="client">
                      <ClientDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/freelancer-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="freelancer">
                      <FreelancerDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      © 2025 FreelanceHub. All rights reserved.
                    </p>
                  </div>
                  <div className="flex space-x-6">
                    <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Terms of Service
                    </Link>
                    <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Privacy Policy
                    </Link>
                    <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;