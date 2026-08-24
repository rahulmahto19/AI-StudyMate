import { adminAuth } from "../config/firebaseAdmin.js";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    // ==========================================
    // Get Authorization Header
    // ==========================================

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    // Expected:
    // Authorization: Bearer FIREBASE_ID_TOKEN

    if (
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    const idToken =
      authHeader.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Firebase ID token is missing.",
      });
    }

    // ==========================================
    // Verify Firebase Token
    // ==========================================

    const decodedToken =
      await adminAuth.verifyIdToken(
        idToken
      );

    // ==========================================
    // Attach Firebase User
    // ==========================================

    req.firebaseUser = decodedToken;

    next();
  } catch (error) {
    console.error(
      "Authentication middleware error:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired authentication token.",
    });
  }
};

export default authMiddleware;