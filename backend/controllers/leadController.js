import Lead from "../models/Lead.js";
import mongoose from "mongoose";

// Add a new lead
export const createLead = async (req, res) => {
  try {
    // Get lead data from request body
    const { name, email, phone, company, source, status } = req.body;

    // Check required fields
    if (!name || !email || !phone || !company || !source) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Save lead in MongoDB
    const newLead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      status,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: newLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const { search, status } = req.query;

    let filter = {};

    // Search leads by name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter leads by status
    if (status) {
      filter.status = status;
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an existing lead
export const updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, status } = req.body;

    // Check required fields
    if (!name || !email || !phone || !company || !source) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Find lead by ID and update it
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, company, source, status },
      {
        new: true,
        runValidators: true,
      },
    );

    // Check whether lead exists
    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Send updated lead
    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an existing lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    // Check whether ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    // Find and delete lead
    const deletedLead = await Lead.findByIdAndDelete(id);

    // Check whether lead exists
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: deletedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
