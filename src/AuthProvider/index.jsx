import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role to state
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData) => {
    setIsLoading(true)
    // Perform login logic, then set user and role in state
    setUser(userData);
    setRole(userData.permissionLevel);
    setIsLoading(false);
  };

  const logout = () => {
    // Perform logout logic, then clear user and role from state
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
