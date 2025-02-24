import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  idType: { type: String },
  idNumber: { type: String },
  facebookLink: { type: String },
  twitterLink: { type: String },
  serverName: { type: String },
  barangay: { type: String },
  city: { type: String },
  street: { type: String },
  zipCode: { type: String },
  applicationDate: { type: Date, default: Date.now },
  accountActivatedDate: { type: Date },
  username: { type: String },
  file: { type: String },
});

export default mongoose.model("Client", formDataSchema);
