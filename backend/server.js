import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// ==========================================
// Load Configurations
// ==========================================

const { default: connectDB } =
  await import("./config/db.js");

await import(
  "./config/firebaseAdmin.js"
);

// ==========================================
// Routes
// ==========================================

const { default: authRoutes } =
  await import(
    "./routes/authRoutes.js"
  );

const { default: profileRoutes } =
  await import(
    "./routes/profileRoutes.js"
  );

// ==========================================
// Express App
// ==========================================

const app = express();

const PORT =
  process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================

app.use(
  cors({
    origin:
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json()
);

// ==========================================
// Test Route
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "AI StudyMate API is running",
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

// ==========================================
// PROFILE ROUTES
// ==========================================

app.use(
  "/api/profile",
  profileRoutes
);

// ==========================================
// API 404 ROUTE
// ==========================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
);

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {
    console.error(
      "Server error:",
      error
    );

    res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal server error.",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

const startServer =
  async () => {
    try {
      // Connect MongoDB
      await connectDB();

      // Start Express
      app.listen(
        PORT,
        () => {
          console.log(
            `Server running on port ${PORT}`
          );

          console.log(
            `Auth API: http://localhost:${PORT}/api/auth/google`
          );

          console.log(
            `Profile API: http://localhost:${PORT}/api/profile`
          );
        }
      );
    } catch (error) {
      console.error(
        "Server startup failed:",
        error.message
      );

      process.exit(1);
    }
  };

startServer();