// routes/subscriptionRoutes.js
import express from 'express';
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from '../controllers/subscriptionController.js';

const router = express.Router();

// Route to create a new subscription
router.post('/', createSubscription);

// Route to get all subscriptions
router.get('/', getAllSubscriptions);

// Route to get a subscription by ID
router.get('/:id', getSubscriptionById);

// Route to update a subscription by ID
router.put('/:id', updateSubscription);

// Route to delete a subscription by ID
router.delete('/:id', deleteSubscription);

export default router;
