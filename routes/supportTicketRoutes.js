import express from 'express';
import {
  createSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  updateSupportTicket,
  deleteSupportTicket,
} from '../controllers/supportTicketController.js';

const router = express.Router();

// Route for creating a support ticket
router.post('/', createSupportTicket);

// Route for fetching all support tickets
router.get('/', getAllSupportTickets);

// Route for fetching a support ticket by ID
router.get('/:id', getSupportTicketById);

// Route for updating a support ticket
router.put('/:id', updateSupportTicket);

// Route for deleting a support ticket
router.delete('/:id', deleteSupportTicket);

export default router;
