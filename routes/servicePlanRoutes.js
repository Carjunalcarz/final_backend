import express from "express";
import {
  createServicePlan,
  getAllServicePlans,
  getServicePlanById,
  updateServicePlan,
  deleteServicePlan,
} from "../controllers/servicePlanController.js";

const router = express.Router();

router.post("/", createServicePlan); // Create a service plan
router.get("/", getAllServicePlans); // Get all service plans
router.get("/:id", getServicePlanById); // Get a service plan by ID
router.put("/:id", updateServicePlan); // Update a service plan
router.delete("/:id", deleteServicePlan); // Delete a service plan

export default router;
