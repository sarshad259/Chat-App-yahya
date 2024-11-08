import './App.css';
import { createBrowserRouter,  RouterProvider, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';
import ChatPage from './Pages/ChatPage';
import Signup from './Pages/Signup';
import { AuthProvider } from './context/AuthContext';
import PublicRoutes from './AuthRouting/PublicRoutes';
import PrivateRoutes from './AuthRouting/PrivateRoutes';
import { UserProvider } from './context/UsersContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function HomeRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/messages/1');
  }, [navigate]);

  return null;
}
const router = createBrowserRouter([
  { path: '/login', element: <PublicRoutes element={<Login />} /> },
  { path: '/signup', element: <PublicRoutes element={<Signup />} /> },
  { path: '/messages/:id', element: <PrivateRoutes element={<ChatPage />} /> },
  { path: '/', element: <PrivateRoutes element={<HomeRedirect />} />},
]);


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;