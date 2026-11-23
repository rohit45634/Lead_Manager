import axios from "axios";

const API = axios.create({
  baseURL: "https://lead-manager-api-3f7i.onrender.com/api",
  withCredentials: true,
});

// Get all leads with optional search and filter
export const getLeads = (params = {}) => API.get("/leads", { params });

// Create a lead
export const createLead = (leadData) => API.post("/leads", leadData);

// Update a lead
export const updateLead = (id, leadData) => API.put(`/leads/${id}`, leadData);

// Delete a lead
export const deleteLead = (id) => API.delete(`/leads/${id}`);
