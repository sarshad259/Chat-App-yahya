import React, { useState, useEffect, useRef } from 'react';
import { IsTyping } from '../Firebase/IsTyping';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const MessageInput = ({ addMessage, conversationId }) => {
  const {currentUser} = useAuth()
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      addMessage(inputValue);
      setInputValue("");
      IsTyping(conversationId, false);
      clearTimeout(typingTimeoutRef.current);
    } else {
      toast.error("Please type somthing")
    }
  };

  const handleTyping = () => {

    IsTyping(conversationId, currentUser.uid);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }


    typingTimeoutRef.current = setTimeout(() => {
      IsTyping(conversationId, false);
    }, 2000);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleTyping();
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        className="flex-grow p-4 bg-gray-700 rounded-lg text-sm outline-none"
      />
      <button
        onClick={handleSend}
        className="ml-4 p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,21L23,12L2,3V21Z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;