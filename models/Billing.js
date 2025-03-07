// models/Billing.js
import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  servicePlan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServicePlan', required: true },
  amountDue: { type: Number},
  daysUsed : {type : Number },
  startDate: { type: Date },
  dueDate: { type: Date },
  paidDate: { type: Date },
  isPaid: { type: Boolean},
  totalAmount : {type : Number},
  balance : {type : Number},
  paymentAmount: {type : Number}
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
