// routes/billingRoutes.js
import express from 'express';
import {
  createBilling,
  getAllBillings,
  getBillingById,
  updateBilling,
  deleteBilling
} from '../controllers/billingController.js';

const router = express.Router();

// Route for creating a new billing record
router.post('/', createBilling);

// Route for getting all billing records
router.get('/', getAllBillings);

// Route for getting a billing record by ID
router.get('/:id', getBillingById);

// Route for updating a billing record by ID
router.put('/:id', updateBilling);

// Route for deleting a billing record by ID
router.delete('/:id', deleteBilling);

export default router;
