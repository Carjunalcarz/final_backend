// models/Billing.js
import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema(
  {
    subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
    servicePlan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServicePlan', required: true },
    approved_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    status : {type : Boolean},
    amountDue: { type: Number },
    daysUsed: { type: Number },
    startDate: { type: Date },
    dueDate: { type: Date },
    paidDate: { type: Date },
    isPaid: { type: Boolean, default: false }, // Default value set to false
    totalAmount: { type: Number },
    balance: { type: Number },
    paymentAmount: { type: Number },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
