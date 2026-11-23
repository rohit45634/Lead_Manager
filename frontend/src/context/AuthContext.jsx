
import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signup
  const signup = async (userData) => {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  };

  // Login
  const login = async (credentials) => {
    const response = await API.post("/auth/login", credentials);

    const { user } = response.data;

    setUser(user);

    return response.data;
  };

  // Logout
  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
