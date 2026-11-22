import express from "express";
import {
  createLead,
  deleteLead,
  getAllLeads,
  updateLead,
} from "../controllers/leadController.js";

const router = express.Router();

// POST - Create a new lead
router.post("/", createLead);

// GET - Fetch all leads
router.get("/", getAllLeads);

// PUT - Update existing lead
router.put("/:id", updateLead);

// Delete lead
router.delete("/:id", deleteLead);

export default router;
