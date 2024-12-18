import mongoose from 'mongoose';

const networkNodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number }, // Maximum connections supported
  isActive: { type: Boolean, default: true },
});

const NetworkNode = mongoose.model('NetworkNode', networkNodeSchema);

export default NetworkNode;
