// controllers/billingController.js
import mongoose from "mongoose";
import Billing from "../models/Billing.js";
import Subscription from "../models/Subscription.js"; // ✅ Ensure Subscription model is imported
// Create a new billing record
export const createBilling = async (req, res) => {
  try {
    const { subscription_id, servicePlan_id, dueDate, daysUsed, totalAmount, balance, paymentAmount, isPaid, amountDue, paidDate } = req.body;

    console.log("🔹 Received subscription_id:", subscription_id);

    // ✅ Step 1: Check if subscription_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(subscription_id)) {
      return res.status(400).json({ success: false, message: "Invalid subscription_id format" });
    }

    // ✅ Step 2: Convert to ObjectId (if necessary)
    const subscriptionObjectId = new mongoose.Types.ObjectId(subscription_id);

    // ✅ Step 3: Check if the subscription exists
    const existingSubscription = await Subscription.findById(subscriptionObjectId);
    if (!existingSubscription) {
      return res.status(404).json({ success: false, message: "Subscription not found in DB" });
    }

    // ✅ Step 4: Update Subscription's Start Date
    const currentDate = new Date();
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionObjectId,
      { startDate: currentDate },
      { new: true }
    );

    if (!updatedSubscription) {
      return res.status(404).json({ success: false, message: "Subscription update failed" });
    }

    console.log("✅ Subscription startDate updated:", updatedSubscription.startDate);

    // ✅ Step 5: Create new Billing Record
    const newBilling = new Billing({
      subscription_id: subscriptionObjectId,
      servicePlan_id,
      startDate: currentDate,
      daysUsed,
      totalAmount,
      balance,
      paymentAmount,
      amountDue,
      dueDate,
      paidDate,
      isPaid,
    });

    await newBilling.save();
    res.status(201).json({ success: true, data: newBilling });

  } catch (error) {
    console.error("❌ Error in createBilling:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all billing records
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find().populate("subscription_id");
    res.status(200).json({ success: true, data: billings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get billing record by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.find({ subscription_id: req.params.id }).populate("subscription_id");
    if (!billing) {
      return res
        .status(404)
        .json({ success: false, message: "Billing record not found" });
    }
    res.status(200).json({ success: true, data: billing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a billing record
export const updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBilling) {
      return res
        .status(404)
        .json({ success: false, message: "Billing record not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "Billing record not found" });
    }
    res.status(200).json({ success: true, message: "Billing record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
