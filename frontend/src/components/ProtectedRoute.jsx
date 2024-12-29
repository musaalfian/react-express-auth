import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
   const token = localStorage.getItem('myToken');

   if (!token) {
      return <Navigate to='/login' replace />;
   }

   return children;
};

export default ProtectedRoute;