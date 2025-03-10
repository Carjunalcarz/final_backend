import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import path from "path"; // Import path
import { fileURLToPath } from "url";
import { dirname } from "path";
import serverless from 'serverless-http';

// Import routes
import userRoutes from "./routes/userRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import servicePlanRoutes from "./routes/servicePlanRoutes.js"
import subscriptionRoutes from "./routes/subscriptionRoutes.js"
import supportTicketRoutes from "./routes/supportTicketRoutes.js"
import networkNodeRoutes from "./routes/networkNodeRoutes.js"
import connectionRoutes from "./routes/connectionRoutes.js"
import billingRoutes from "./routes/billingRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";


dotenv.config();

const app = express();

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example usage of __dirname for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Enable session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);



// Enable CORS for all origins
// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow common HTTP methods
//     credentials: true, // Include cookies in requests
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.89:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());


// Replace body-parser.json() with express.json()
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/forms", authMiddleware ,formRoutes);
app.use("/api/service-plans",authMiddleware , servicePlanRoutes);
app.use("/api/subscriptions",authMiddleware, subscriptionRoutes);
app.use('/api/support-tickets', supportTicketRoutes);
app.use('/api/network-nodes', networkNodeRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/billings',authMiddleware , billingRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log(process.env.MONGO_URI); // Example for MongoDB connection string

// Export the handler function for Vercel
export default app;