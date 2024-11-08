import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Failed to login:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#111827] bg-gradient-to-br from-[#111827] to-[#1f2937] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse -top-52 -left-52"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-pulse -bottom-32 -right-32"></div>
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="bg-[#1e293b]/50 p-10 rounded-2xl shadow-2xl backdrop-blur-lg w-[500px] transform hover:scale-105 transition-all duration-300 border border-purple-500/20 relative z-10">
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">Welcome Back</h2>
            <p className="text-gray-400 text-sm mt-2">Sign in to continue!</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/50 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 border border-gray-700 group-hover:border-purple-500"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/50 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 border border-gray-700 group-hover:border-purple-500"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-80 transition-all duration-300 flex items-center justify-center gap-1 inline-flex">
            <span>Create Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;