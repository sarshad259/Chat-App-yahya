import React, { useEffect } from 'react'
import CharList from '../components/ChatList'
import ChatUI from '../components/ChatUi'
import { useUsers } from '../context/UsersContext';
import { useParams } from 'react-router-dom';
import { FetchUsers } from '../Firebase/FetchUsers';
import Loader from '../components/Loader';
import { IoSearch } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { users, setUsers, setLoading, loading } = useUsers();
  const { logout , currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = FetchUsers((data) => {
      setUsers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUsers]);
  if (loading) {
    return <Loader />
  }
  const { id } = useParams()
  const user = users?.find((user) => { return user?.id == id })

  return (
    <div className='flex flex-col bg-[#111827] bg-gradient-to-br from-[#111827] to-[#1f2937] min-h-screen transition-all duration-300 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse -top-52 -left-52"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-pulse -bottom-32 -right-32"></div>
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="px-6 h-[70px] flex justify-between items-center text-white backdrop-blur-lg bg-[#1e293b]/50 border-b border-purple-500/20 sticky top-0 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">Messages</h1>
        <div className='flex gap-6 items-center'>
          <div className="relative group">
            <IoSearch 
              className="text-2xl cursor-pointer transform transition-all hover:scale-110 hover:text-purple-500" 
           />

            
            
          </div>
          
          <div className="relative group">
            <BiLogOut 
              onClick={()=>logout()} 
              className="text-2xl cursor-pointer transform transition-all hover:scale-110 hover:text-pink-500"
            />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
          </div>

          <div className="flex items-center space-x-4 bg-[#0f172a]/50 px-4 py-2 rounded-lg transition-all hover:bg-[#0f172a]/70 border border-gray-700 hover:border-purple-500">
            <div className="flex flex-col">
              <p className="font-medium text-sm">{currentUser?.displayName}</p>
            </div>
            <div className="relative">
              <img 
                src={currentUser?.photoURL} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover object-center ring-2 ring-purple-500 transform transition-all hover:scale-105" 
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-1 transition-all duration-300 relative z-10'>
        <div className="animate-slideIn">
          <CharList />
        </div>
        <div className="flex-1 animate-fadeIn">
          <ChatUI user={user} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage