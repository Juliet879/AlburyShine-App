import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role to state

  const login = (userData) => {
    // Perform login logic, then set user and role in state
    console.log({userData})
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    // Perform logout logic, then clear user and role from state
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
