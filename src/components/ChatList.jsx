import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { useUsers } from "../context/UsersContext";
import styles from './style.module.css';
import { useAuth } from "../context/AuthContext";
import { FetchLastMessage } from "../Firebase/FetchLastMessage";

const ChatList = () => {
  const { currentUser } = useAuth();
  const { users } = useUsers();
  const [lastMessages, setLastMessages] = useState({});

  const generateConversationId = (userId1, userId2) => {
    const sortedUserIds = [userId1, userId2].sort();
    return sortedUserIds.join('_');
  };

  useEffect(() => {
    const unsubscribes = [];

    const fetchLastMessages = async () => {
      await Promise.all(
        users.map((user) => {
          if (user.id !== currentUser.uid) {
            const conversationId = generateConversationId(currentUser.uid, user.id);
            const unsubscribe = FetchLastMessage(conversationId, (lastMessage) => {
              setLastMessages((prevMessages) => ({
                ...prevMessages,
                [user.id]: lastMessage,
              }));
            });
            unsubscribes.push(unsubscribe);
          }
        })
      );
    };

    fetchLastMessages();

  
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [users, currentUser.uid]);

  return (
    <div>
      <div className={`${styles.scrollable} w-full max-w-[400px] min-w-[250px] scroll bg-[#292F3F] shadow-lg overflow-hidden h-[calc(100vh_-_60px)] overflow-y-auto`}>
        {users.map((user) => (
          user.id !== currentUser.uid && (
            <ChatItem
              key={user.id}
              user={user}
              lastMessage={lastMessages[user.id]}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default ChatList;