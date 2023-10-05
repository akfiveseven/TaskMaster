// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState('');

  return (
    <AuthContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
