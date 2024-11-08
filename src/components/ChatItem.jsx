import React from "react";
import { useNavigate } from "react-router-dom";
import { FormatTimestamp } from "../Firebase/FormatTimeStamp";
import { useAuth } from "../context/AuthContext";

const ChatItem = ({ user , lastMessage }) => {
  const {currentUser} = useAuth()

  const navigate = useNavigate()
  
  return (
    <div  onClick={()=>{navigate(`/messages/${user.id}`)}} className="flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-all duration-200">
      <img
        src={user.profileImage}
        alt={`${user.name}'s profile`}
        style={{boxShadow:'#1e1e1e 0px 6px 9px -1px'}}
        className="w-10 h-10 rounded-full mr-4 object-cover object-center"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">{user.name}</h3>
          <span className="text-[green] text-[12px]">
  {lastMessage?.isTyping && lastMessage?.isTyping !== currentUser.uid 
    ? 'Typing...' 
    : lastMessage?.lastMessage 
      ? FormatTimestamp(lastMessage.lastMessage.timestamp) 
      : '--'}
</span>
        </div>
        <p className="text-gray-500 text-sm truncate">{lastMessage?.lastMessage?.message || 'No message'}</p>
      </div>
    </div>
  );
};

export default ChatItem;