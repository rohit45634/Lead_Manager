import axios from "axios";

const API_URL = "https://lead-manager-api-3f7i.onrender.com/api/auth";

// Signup API
export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData, {
    withCredentials: true,
  });
};

// Login API
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
  });
};
