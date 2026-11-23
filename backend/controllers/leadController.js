import Lead from "../models/Lead.js";
import mongoose from "mongoose";

// Add a new lead
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, status } = req.body;

    // Check required fields
    if (!name || !email || !phone || !company || !source) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate email or phone for this user
    const existingLead = await Lead.findOne({
      user: req.user._id,
      $or: [{ email }, { phone }],
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "Lead with this email or phone already exists",
      });
    }

    // Save lead with logged-in user ID
    const newLead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      status,
      user: req.user._id,
    });

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

    let filter = {
      user: req.user._id,
    };

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

    if (!name || !email || !phone || !company || !source) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate email or phone for this user
    const existingLead = await Lead.findOne({
      _id: { $ne: req.params.id },
      user: req.user._id,
      $or: [{ email }, { phone }],
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "Another lead with this email or phone already exists",
      });
    }

    // Find and update only the logged-in user's lead
    const updatedLead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { name, email, phone, company, source, status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

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

    // Delete only the logged-in user's lead
    const deletedLead = await Lead.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

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
