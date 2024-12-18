// controllers/billingController.js
import Billing from '../models/Billing.js';

// Create a new billing record
export const createBilling = async (req, res) => {
  try {
    const { subscription, amountDue, dueDate, paidDate, isPaid } = req.body;

    const newBilling = new Billing({
      subscription,
      amountDue,
      dueDate,
      paidDate,
      isPaid,
    });

    await newBilling.save();
    res.status(201).json({ success: true, data: newBilling });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all billing records
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find().populate('subscription');
    res.status(200).json({ success: true, data: billings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get billing record by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate('subscription');
    if (!billing) {
      return res.status(404).json({ success: false, message: 'Billing record not found' });
    }
    res.status(200).json({ success: true, data: billing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a billing record
export const updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBilling) {
      return res.status(404).json({ success: false, message: 'Billing record not found' });
    }
    res.status(200).json({ success: true, data: updatedBilling });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a billing record
export const deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling) {
      return res.status(404).json({ success: false, message: 'Billing record not found' });
    }
    res.status(200).json({ success: true, message: 'Billing record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
