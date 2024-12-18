import express from "express";
import multer from "multer";
import path from "path";
import { saveFormData, getAllForms } from "../controllers/formController.js";

const router = express.Router();

// Set up file storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

// Routes
router.post("/", upload.single("file"), saveFormData);
router.get("/", getAllForms);

export default router;
