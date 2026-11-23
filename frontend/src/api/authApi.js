import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Signup API
export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// Login API
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};
