import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  node: { type: mongoose.Schema.Types.ObjectId, ref: "NetworkNode", required: true },
  ipAddress: { type: String, required: true, unique: true },
  macAddress: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
