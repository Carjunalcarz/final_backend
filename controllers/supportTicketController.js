import SupportTicket from "../models/SupportTicket.js";

// Create a new support ticket
export const createSupportTicket = async (req, res) => {
  try {
    const { user, subject, description, status } = req.body;

    const newTicket = new SupportTicket({
      user,
      subject,
      description,
      status,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json({ success: true, data: savedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all support tickets
export const getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().populate("user");
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a support ticket by ID
export const getSupportTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id).populate("user");
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a support ticket by ID
export const updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const ticket = await SupportTicket.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a support ticket by ID
export const deleteSupportTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    res.status(200).json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
