// models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'FormData', required: true },
  servicePlan: { type: mongoose.Schema.Types.ObjectId, ref: 'ServicePlan', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Subscription", subscriptionSchema);
