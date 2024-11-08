import React, { createContext, useContext, useState } from "react";
const initialUserData = {
  loading:true,
  users:null,
};
  
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUserData.users);
  const [loading, setLoading] = useState(initialUserData.loading);

  return (
    <UserContext.Provider value={{ users, setUsers , loading , setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);