import FormData from "../models/Client.js";

// @desc Save form data
export const saveFormData = async (req, res) => {
  try {
    const formData = new FormData({
      ...req.body,
      file: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const savedData = await formData.save();
    res.status(201).json({ success: true, data: savedData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Get all form data
export const getAllForms = async (req, res) => {
  try {
    const forms = await FormData.find();
    res.json({ success: true, data: forms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
