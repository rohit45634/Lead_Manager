import axios from "axios";

const API_URL = "https://lead-manager-api-3f7i.onrender.com/auth";

// Signup API
export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// Login API
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};
