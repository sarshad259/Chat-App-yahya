import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const PrivateRoutes = ({ element }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loader/>;  

  return currentUser ? element : <Navigate to="/login" />;  
};

export default PrivateRoutes;