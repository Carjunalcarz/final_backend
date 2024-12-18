// models/Billing.js
import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  amountDue: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  isPaid: { type: Boolean, default: false },
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;
