import mongoose from "mongoose";

// 1. Create Lead Schema
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      enum: ["Website", "LinkedIn", "Facebook", "Referral", "Other"],
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

// 2. Create Lead Model
const Lead = mongoose.model("Lead", leadSchema);

// 3. Export Model
export default Lead;
