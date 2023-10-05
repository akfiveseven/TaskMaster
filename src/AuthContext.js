// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [currSession, setCurrSession] = useState('');

  return (
    <AuthContext.Provider value={{ loggedInUsername, setLoggedInUsername, currSession, setCurrSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
