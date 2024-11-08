import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const PublicRoutes = ({ element }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return<Loader/>;

  return !currentUser ? element : <Navigate to="/" replace />;
};

export default PublicRoutes;