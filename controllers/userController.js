import User from "../models/User.js";
import mongoose from "mongoose";

const getProfile = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
const profile = async (req, res) => {
  try {
    const user = { ...req.user._doc, password: undefined };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const getProfileById = async (req, res) => {
  try {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User  not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName , role } = req.body;

    if (!firstName || !lastName || !role) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName , role},
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User  not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating profile: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          throw err;
        }
        // Remove the authentication token from the request headers
        req.headers.authorization = null;
        res.json({ message: "Logged out successfully" });
      });
    } else {
      // If req.session is undefined, try to clear the token from the request headers
      req.headers.authorization = null;
      res.json({ message: "Logged out successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

export { profile, getProfile, updateProfile, getProfileById, logout };
