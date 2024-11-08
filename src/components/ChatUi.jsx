import React, { useEffect, useRef } from 'react';
import placeholderMan from '../assets/placeholder-man.jpg';
import MessageInput from './MessageInput';
import { useUsers } from '../context/UsersContext';
import { AddMessage } from '../Firebase/AddMessage';
import { useAuth } from '../context/AuthContext';
import { FetchMessage } from '../Firebase/FetchMessage';
import { FormatTimestamp } from '../Firebase/FormatTimeStamp';
import style from './style.module.css'
import { MdDelete } from "react-icons/md";
import { DeleteMessage } from '../Firebase/deleteMessage';
import { MdEdit } from "react-icons/md";
import { EditMessage } from '../Firebase/EditMessage';

const ChatUI = ({ user }) => {
  if (!user) {
    return (
      <div className="w-full text-center bg-[#1B202D] text-white rounded-lg h-[calc(100vh_-_60px)] flex justify-center flex-col shadow-lg p-4 space-y-4">
        <h1 className="text-[30px]">Let's have a chat!</h1>
      </div>
    );
  }

  const { currentUser } = useAuth();
  const generateConversationId = (userId1, userId2) => {
    const sortedUserIds = [userId1, userId2].sort();
    return sortedUserIds.join('_');
  };
  const conversationId = generateConversationId(currentUser.uid, user?.id);
  const messages = FetchMessage(conversationId);

  const addMessage = async (newMessage) => {
    const conversationId = generateConversationId(currentUser.uid, user.id);
    await AddMessage(conversationId, { message: newMessage, senderId: currentUser.uid });
  };

  const inboxContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (inboxContainerRef.current) {
      inboxContainerRef.current.scrollTop = inboxContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full bg-[#1B202D] text-white rounded-lg h-[calc(100vh_-_60px)] flex justify-between flex-col shadow-lg p-4 space-y-4">
      <div className="flex items-center space-x-4 sticky top-0">
        <img
          src={user?.profileImage || placeholderMan}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover object-center"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{user?.name}</span>
          <span className="text-xs text-gray-400">{user?.email}</span>
        </div>
      </div>

      <div ref={inboxContainerRef} className={`space-y-4 overflow-y-auto max-h-80 ${style.scrollable}`}>
        {messages?.map((message, index) => (
          message.message &&
          <div key={index} className={`flex ${message.senderId === currentUser.uid ? "justify-end" : ""}`}>
            <div className="flex flex-col items-end space-y-1">
              <div
                className={`py-1 px-[15px] rounded-lg  text-[18px] flex gap-2 items-center ${message.senderId === currentUser.uid ? "bg-[#292F3F] rounded-tr-[0px]" : "bg-gray-700 rounded-tl-[0px]"
                  }`}
              >
                {message.message}
                {message.senderId === currentUser.uid && message.message !== 'this messge is deleted' && (
                  <div className="flex gap-2">
                    <span onClick={() => DeleteMessage(conversationId, message.id)}>
                      <MdDelete />
                    </span>
                    <span onClick={() => EditMessage(conversationId, message.id, message.message)}>
                      <MdEdit className="cursor-pointer hover:text-yellow-500 transition-colors" />
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {FormatTimestamp(message?.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <MessageInput addMessage={addMessage} conversationId={conversationId} />
    </div>
  );
};

export default ChatUI;