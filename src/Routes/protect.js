import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token") !== "";
    console.log(isAuthenticated);
    
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
