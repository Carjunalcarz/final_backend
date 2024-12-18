import NetworkNode from '../models/NetworkNode.js';

// Create a new NetworkNode
export const createNetworkNode = async (req, res) => {
  try {
    const { name, location, capacity, isActive } = req.body;
    const newNode = new NetworkNode({ name, location, capacity, isActive });
    const savedNode = await newNode.save();
    res.status(201).json({ success: true, data: savedNode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all NetworkNodes
export const getAllNetworkNodes = async (req, res) => {
  try {
    const nodes = await NetworkNode.find();
    res.status(200).json({ success: true, data: nodes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single NetworkNode by ID
export const getNetworkNodeById = async (req, res) => {
  try {
    const node = await NetworkNode.findById(req.params.id);
    if (!node) {
      return res.status(404).json({ success: false, message: 'Network Node not found' });
    }
    res.status(200).json({ success: true, data: node });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a NetworkNode by ID
export const updateNetworkNode = async (req, res) => {
  try {
    const updatedNode = await NetworkNode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedNode) {
      return res.status(404).json({ success: false, message: 'Network Node not found' });
    }
    res.status(200).json({ success: true, data: updatedNode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a NetworkNode by ID
export const deleteNetworkNode = async (req, res) => {
  try {
    const deletedNode = await NetworkNode.findByIdAndDelete(req.params.id);
    if (!deletedNode) {
      return res.status(404).json({ success: false, message: 'Network Node not found' });
    }
    res.status(200).json({ success: true, message: 'Network Node deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
