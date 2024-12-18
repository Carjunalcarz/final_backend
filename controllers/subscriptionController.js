// controllers/subscriptionController.js
import Subscription from '../models/Subscription.js';

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.status(201).json({ success: true, data: newSubscription });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a subscription by ID
export const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a subscription by ID
export const updateSubscription = async (req, res) => {
    try {
      const { id } = req.params; // Get the subscription ID from URL params
      const updatedData = req.body; // Get the updated data from the request body
  
      // Use `findByIdAndUpdate` to update the subscription document by ID
      const subscription = await Subscription.findByIdAndUpdate(id, updatedData, {
        new: true,        // Return the updated document
        runValidators: true, // Ensure validation is done on the updated data
      });
  
      // If no subscription is found with the given ID, return a 404 response
      if (!subscription) {
        return res.status(404).json({ success: false, message: 'Subscription not found' });
      }
  
      // Return the updated subscription in the response
      res.status(200).json({ success: true, data: subscription });
    } catch (error) {
      // Catch any errors and return a 500 server error response
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Delete a subscription by ID
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
