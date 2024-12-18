import mongoose from "mongoose";

const servicePlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speedMbps: { type: Number, required: true }, // Speed in Mbps
  dataLimitGB: { type: Number }, // Data cap in GB
  pricePerMonth: { type: Number, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("ServicePlan", servicePlanSchema);
