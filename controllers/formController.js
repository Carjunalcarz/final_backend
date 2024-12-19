import FormData from "../models/Client.js";
import { validationResult } from "express-validator";

// @desc Save form data
export const saveFormData = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Create new form data
    const formData = new FormData({
      ...req.body,
      file: req.file ? `/uploads/${req.file.filename}` : null, // Handle file upload
    });

    const savedData = await formData.save();
    res.status(201).json({ success: true, data: savedData });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// @desc Get all form data
export const getAllForms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Pagination logic
    const forms = await FormData.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await FormData.countDocuments();

    res.json({
      success: true,
      data: forms,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching forms:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
