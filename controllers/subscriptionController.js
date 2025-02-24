// controllers/subscriptionController.js
import Subscription from '../models/Subscription.js';


// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.status(201).json({ success: true, data: newSubscription });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all subscriptions
// export const getAllSubscriptions = async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find();
//     res.status(200).json({ success: true, data: subscriptions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllSubscriptions = async (req, res) => {
//   try {
//     // Pagination parameters
//     const { page = 1, limit = 10 } = req.query;

//     // Convert page and limit to numbers
//     const pageNumber = parseInt(page, 10);
//     const pageSize = parseInt(limit, 10);

//     if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
//       return res.status(400).json({ success: false, message: "Invalid page or limit parameter" });
//     }

//     // Fetch subscriptions with pagination
//     const subscriptions = await Subscription.find()
//       .skip((pageNumber - 1) * pageSize)  // Skips the documents based on page number
//       .limit(pageSize)  // Limits the number of documents per page
//       .populate('user', 'firstName lastName email phoneNumber')  // Populate user fields
//       .populate('servicePlan', 'name');  // Optional: populate servicePlan if needed

//     // Count total documents for pagination metadata
//     const totalSubscriptions = await Subscription.countDocuments();

//     // Calculate total pages
//     const totalPages = Math.ceil(totalSubscriptions / pageSize);

//     res.json({
//       success: true,
//       data: subscriptions,
//       pagination: {
//         currentPage: pageNumber,
//         totalPages: totalPages,
//         totalSubscriptions: totalSubscriptions,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching subscriptions:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


export const getAllSubscriptions = async (req, res) => {
  try {
    // Fetch all subscriptions and populate fields as needed
    const subscriptions = await Subscription.find()
          .populate("client")
          .populate("servicePlan")

    // Count total documents
    const totalSubscriptions = await Subscription.countDocuments();

    res.json({
      success: true,
      data: subscriptions,
      totalSubscriptions: totalSubscriptions,  // Return total count
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Get a subscription by ID with populated user & service plan
export const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id)
    .populate("client")
    .populate("servicePlan");
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a subscription by ID
export const updateSubscription = async (req, res) => {
    try {
      const { id } = req.params; // Get the subscription ID from URL params
      const updatedData = req.body; // Get the updated data from the request body
  
      // Use `findByIdAndUpdate` to update the subscription document by ID
      const subscription = await Subscription.findByIdAndUpdate(id, updatedData, {
        new: true,        // Return the updated document
        runValidators: true, // Ensure validation is done on the updated data
      });
  
      // If no subscription is found with the given ID, return a 404 response
      if (!subscription) {
        return res.status(404).json({ success: false, message: 'Subscription not found' });
      }
  
      // Return the updated subscription in the response
      res.status(200).json({ success: true, data: subscription });
    } catch (error) {
      // Catch any errors and return a 500 server error response
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Delete a subscription by ID
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    // Log the received id to ensure the correct one is being passed
    console.log('Attempting to delete subscription with ID:', id);

    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      console.log('Subscription not found');
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    console.log('Subscription deleted:', subscription); // Log the deleted subscription

    res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error); // Log the error message
    res.status(500).json({ success: false, message: error.message });
  }
};
