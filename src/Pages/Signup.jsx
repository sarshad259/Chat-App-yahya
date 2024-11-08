import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { addUserToFirestore } from '../Firebase/AddUserToFirestore';
import { CiCamera } from "react-icons/ci";
import uploadToCloudinary from '../Utils/UploadToCloudinary';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const defaultProfilePic = 'https://res.cloudinary.com/duaxitxph/image/upload/v1730489678/fvnlm4dqusnv4il9ee00.webp';

  const { signup } = useAuth();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if(!name , !email , !password){
        return toast.error('all Inputs should be filled')
      }
      const { user } = await signup(email, password);
      const profileImage = selectedImage? await uploadToCloudinary(selectedImage):defaultProfilePic;
      await updateProfile(user, {
        displayName: name,
        photoURL: profileImage
    });
      await addUserToFirestore(user.uid, { email, password , name , profileImage });
    } catch (error) {
      return toast.error("Failed to sign up", error);
    }
  };

  return (
    <div className='flex flex-col bg-[#111827] bg-gradient-to-br from-[#111827] to-[#1f2937] min-h-screen transition-all duration-300 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse -top-52 -left-52"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-pulse -bottom-32 -right-32"></div>
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-[#1B202D]/50 backdrop-blur-lg border border-purple-500/20">
          <div className='flex justify-between items-center'>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Sign Up</h2>
            <div className="flex gap-2 items-center relative">
              <label className="flex w-[80px] h-[80px] justify-center items-center border-2 border-dashed border-purple-500/50 rounded-lg p-3 cursor-pointer hover:bg-gray-800/50 transition duration-300">
                <span className="text-purple-500 text-[30px]"><CiCamera /></span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {selectedImage && (
                <div className="absolute left-[2px] pointer-events-none">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-[75px] h-[75px] object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className='flex gap-5'>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/20 text-white"
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/20 text-white"
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/20 text-white"
            />

            <button
              type="submit"
              className="w-full p-3 mt-4 font-semibold text-white rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-purple-500 hover:text-pink-500 transition-colors hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;