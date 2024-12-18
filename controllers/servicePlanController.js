import ServicePlan from "../models/ServicePlan.js";

export const createServicePlan = async (req, res) => {
  try {
    const servicePlan = new ServicePlan(req.body);
    await servicePlan.save();
    res.status(201).json({ success: true, data: servicePlan });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllServicePlans = async (req, res) => {
  try {
    const servicePlans = await ServicePlan.find();
    res.status(200).json({ success: true, data: servicePlans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getServicePlanById = async (req, res) => {
  try {
    const servicePlan = await ServicePlan.findById(req.params.id);
    if (!servicePlan) {
      return res.status(404).json({ success: false, message: "Service Plan not found" });
    }
    res.status(200).json({ success: true, data: servicePlan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateServicePlan = async (req, res) => {
  try {
    const servicePlan = await ServicePlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!servicePlan) {
      return res.status(404).json({ success: false, message: "Service Plan not found" });
    }
    res.status(200).json({ success: true, data: servicePlan });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteServicePlan = async (req, res) => {
  try {
    const servicePlan = await ServicePlan.findByIdAndDelete(req.params.id);
    if (!servicePlan) {
      return res.status(404).json({ success: false, message: "Service Plan not found" });
    }
    res.status(200).json({ success: true, message: "Service Plan deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
