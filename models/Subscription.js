import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }, // Reference to Client
  servicePlan: { type: mongoose.Schema.Types.ObjectId, ref: "ServicePlan", required: true }, // Reference to ServicePlan
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Subscription", subscriptionSchema);
