import { adminAuth } from "../config/firebaseAdmin.js";
import User from "../models/User.js";

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Check token
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required.",
      });
    }

    // ==========================================
    // Verify Firebase ID Token
    // ==========================================

    const decodedToken =
      await adminAuth.verifyIdToken(idToken);

    const {
      uid,
      email,
      name,
      picture,
    } = decodedToken;

    // Email is required
    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Firebase account does not have an email address.",
      });
    }

    // ==========================================
    // Check Admin Email
    // ==========================================

    const adminEmails = (
      process.env.ADMIN_EMAILS || ""
    )
      .split(",")
      .map((email) =>
        email.trim().toLowerCase()
      )
      .filter(Boolean);

    const normalizedEmail =
      email.toLowerCase();

    const isAdmin =
      adminEmails.includes(
        normalizedEmail
      );

    const role = isAdmin
      ? "admin"
      : "student";

    // ==========================================
    // Find Existing User
    // ==========================================

    let user = await User.findOne({
      firebaseUID: uid,
    });

    // ==========================================
    // Create New User
    // ==========================================

    if (!user) {
      user = await User.create({
        firebaseUID: uid,

        name:
          name ||
          normalizedEmail.split("@")[0],

        email: normalizedEmail,

        photoURL: picture || "",

        role,

        provider: "google",

        isActive: true,

        lastLogin: new Date(),
      });
    } else {
      // ========================================
      // Update Existing User
      // ========================================

      user.name =
        name || user.name;

      user.email =
        normalizedEmail;

      user.photoURL =
        picture || user.photoURL;

      user.lastLogin =
        new Date();

      // Keep admin role for admin emails
      if (isAdmin) {
        user.role = "admin";
      }

      await user.save();
    }

    // ==========================================
    // Check Active Account
    // ==========================================

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact the administrator.",
      });
    }

    // ==========================================
    // Send Response
    // ==========================================

    return res.status(200).json({
      success: true,

      message:
        "Google authentication successful.",

      user: {
        id: user._id,

        firebaseUID:
          user.firebaseUID,

        name: user.name,

        email: user.email,

        photoURL:
          user.photoURL,

        role: user.role,

        provider:
          user.provider,

        isActive:
          user.isActive,

        lastLogin:
          user.lastLogin,
      },
    });
  } catch (error) {
    console.error(
      "Google authentication error:",
      error
    );

    return res.status(401).json({
      success: false,

      message:
        "Invalid or expired Firebase token.",
    });
  }
};