import express from 'express';
import RepairRequest from '../models/repair_request_model.js'; // Updated import statement

const router = express.Router();

// Create a new repair request
router.post('/repairs', async (req, res) => {
  try {
    const repair = await RepairRequest.create(req.body);
    res.status(201).json(repair);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get repair requests by customer ID
router.get('/repairs/:customerId', async (req, res) => {
  try {
    const repairs = await RepairRequest.find({ customerId: req.params.customerId });
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a repair request
router.patch('/repairs/:requestId', async (req, res) => {
  try {
    const repair = await RepairRequest.findByIdAndUpdate(
      req.params.requestId,
      req.body,
      { new: true }
    );
    if (!repair) return res.status(404).json({ error: 'Repair request not found' });
    res.json(repair);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
