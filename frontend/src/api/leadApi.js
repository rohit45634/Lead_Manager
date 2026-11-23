import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all leads with optional search and filter
export const getLeads = (params = {}) => API.get("/leads", { params });

// Create a lead
export const createLead = (leadData) => API.post("/leads", leadData);

// Update a lead
export const updateLead = (id, leadData) => API.put(`/leads/${id}`, leadData);

// Delete a lead
export const deleteLead = (id) => API.delete(`/leads/${id}`);
