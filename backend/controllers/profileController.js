import User from "../models/User.js";
import { adminAuth } from "../config/firebaseAdmin.js";

// ==========================================
// GET CURRENT USER PROFILE
// ==========================================

export const getProfile = async (
  req,
  res
) => {
  try {
    const firebaseUID =
      req.firebaseUser.uid;

    const user =
      await User.findOne({
        firebaseUID,
      }).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "Get profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};

// ==========================================
// UPDATE CURRENT USER PROFILE
// ==========================================

export const updateProfile = async (
  req,
  res
) => {
  try {
    const firebaseUID =
      req.firebaseUser.uid;

    const { name } = req.body;

    // ==========================================
    // Validate Name
    // ==========================================

    if (
      !name ||
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    const cleanName =
      name.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain at least 2 characters.",
      });
    }

    if (cleanName.length > 50) {
      return res.status(400).json({
        success: false,
        message:
          "Name cannot exceed 50 characters.",
      });
    }

    // ==========================================
    // Find MongoDB User
    // ==========================================

    const user =
      await User.findOne({
        firebaseUID,
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    // ==========================================
    // Update MongoDB
    // ==========================================

    user.name =
      cleanName;

    await user.save();

    // ==========================================
    // Update Firebase Display Name
    // ==========================================

    await adminAuth.updateUser(
      firebaseUID,
      {
        displayName:
          cleanName,
      }
    );

    // ==========================================
    // Return Updated User
    // ==========================================

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update profile.",
    });
  }
};