import Client from "../models/Client.js";
import { validationResult } from "express-validator";

// @desc Save form data
// @desc Save form data
export const saveFormData = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    // Handle file upload errors
    if (req.fileError) {
      return res.status(400).json({
        success: false,
        message: "File upload failed. Please try again.",
      });
    }

    // Create new form data
    const client = new Client({
      ...req.body,
      file: req.file ? `/uploads/${req.file.filename}` : null, // Handle file upload
    });

    try {
      const savedData = await client.save();
      res.status(201).json({ success: true, data: savedData });
    } catch (dbError) {
      console.error("Database error:", dbError);
      res.status(500).json({
        success: false,
        message: "Could not save form data to the database.",
      });
    }
  } catch (err) {
    // Catch unexpected errors
    console.error("Unexpected error:", err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};


// @desc Get all form data
export const getAllForms = async (req, res) => {
  try {
    const { search = "", fields = "firstName lastName" } = req.query;

    // Create a query for filtering forms
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    // Fetch all matching records with selected fields
    const forms = await Client.find(query, fields.split(",").join(" "));

    res.json({
      success: true,
      data: forms,
      totalItems: forms.length,
    });
  } catch (err) {
    console.error("Error fetching forms:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
