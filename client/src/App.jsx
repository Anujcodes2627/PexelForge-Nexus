import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";
import AccountSettings from "./components/AccountSettings";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-project"
              element={
                <ProtectedRoute>
                  {role === "admin" || role === "lead" ? (
                    <AddProject />
                  ) : (
                    <Navigate to="/dashboard" />
                  )}
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  {role === "admin" ? (
                    <Register />
                  ) : (
                    <Navigate to="/dashboard" />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
