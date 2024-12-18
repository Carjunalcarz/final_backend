// controllers/connectionController.js
import Connection from '../models/Connection.js';

// Create a new connection
export const createConnection = async (req, res) => {
  try {
    const { user, node, ipAddress, macAddress, status } = req.body;

    const newConnection = new Connection({
      user,
      node,
      ipAddress,
      macAddress,
      status,
    });

    await newConnection.save();
    res.status(201).json({ success: true, data: newConnection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all connections
export const getAllConnections = async (req, res) => {
  try {
    const connections = await Connection.find().populate('user node');
    res.status(200).json({ success: true, data: connections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get connection by ID
export const getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id).populate('user node');
    if (!connection) {
      return res.status(404).json({ success: false, message: "Connection not found" });
    }
    res.status(200).json({ success: true, data: connection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update connection by ID
export const updateConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedConnection = await Connection.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate('user node');

    if (!updatedConnection) {
      return res.status(404).json({ success: false, message: "Connection not found" });
    }

    res.status(200).json({ success: true, data: updatedConnection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete connection by ID
export const deleteConnection = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await Connection.findByIdAndDelete(id);

    if (!connection) {
      return res.status(404).json({ success: false, message: "Connection not found" });
    }

    res.status(200).json({ success: true, message: "Connection deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
