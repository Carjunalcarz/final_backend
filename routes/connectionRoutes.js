// routes/connectionRoutes.js
import express from 'express';
import { createConnection, getAllConnections, getConnectionById, updateConnection, deleteConnection } from '../controllers/connectionController.js';

const router = express.Router();

router.post('/', createConnection); // Create a new connection
router.get('/', getAllConnections); // Get all connections
router.get('/:id', getConnectionById); // Get connection by ID
router.put('/:id', updateConnection); // Update connection by ID
router.delete('/:id', deleteConnection); // Delete connection by ID

export default router;
