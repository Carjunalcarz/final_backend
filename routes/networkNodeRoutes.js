import express from 'express';
import {
  createNetworkNode,
  getAllNetworkNodes,
  getNetworkNodeById,
  updateNetworkNode,
  deleteNetworkNode,
} from '../controllers/networkNodeController.js';

const router = express.Router();

// Create a new Network Node
router.post('/', createNetworkNode);

// Get all Network Nodes
router.get('/', getAllNetworkNodes);

// Get a single Network Node by ID
router.get('/:id', getNetworkNodeById);

// Update a Network Node by ID
router.put('/:id', updateNetworkNode);

// Delete a Network Node by ID
router.delete('/:id', deleteNetworkNode);

export default router;
