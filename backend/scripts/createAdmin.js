import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import { adminAuth } from "../config/firebaseAdmin.js";
import User from "../models/User.js";

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL;

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD;

const ADMIN_NAME =
  process.env.ADMIN_NAME ||
  "AI StudyMate Admin";

const createAdmin = async () => {
  try {
    console.log(
      "Connecting to MongoDB..."
    );

    await connectDB();

    console.log(
      "Checking Firebase admin..."
    );

    let firebaseUser;

    // ==========================================
    // Check whether Firebase admin already exists
    // ==========================================

    try {
      firebaseUser =
        await adminAuth.getUserByEmail(
          ADMIN_EMAIL
        );

      console.log(
        "Firebase admin already exists."
      );
    } catch (error) {
      if (
        error.code ===
        "auth/user-not-found"
      ) {
        // ========================================
        // Create Firebase Admin
        // ========================================

        firebaseUser =
          await adminAuth.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            displayName: ADMIN_NAME,
            emailVerified: true,
            disabled: false,
          });

        console.log(
          "Firebase admin created successfully."
        );
      } else {
        throw error;
      }
    }

    // ==========================================
    // Check MongoDB admin
    // ==========================================

    let mongoUser =
      await User.findOne({
        email: ADMIN_EMAIL,
      });

    if (mongoUser) {
      // Update existing user
      mongoUser.firebaseUID =
        firebaseUser.uid;

      mongoUser.name =
        ADMIN_NAME;

      mongoUser.role =
        "admin";

      mongoUser.provider =
        "password";

      mongoUser.isActive =
        true;

      await mongoUser.save();

      console.log(
        "Existing MongoDB user updated to admin."
      );
    } else {
      // ========================================
      // Create MongoDB Admin
      // ========================================

      mongoUser =
        await User.create({
          firebaseUID:
            firebaseUser.uid,

          name:
            ADMIN_NAME,

          email:
            ADMIN_EMAIL,

          photoURL: "",

          role: "admin",

          provider: "password",

          isActive: true,

          lastLogin: null,
        });

      console.log(
        "MongoDB admin created successfully."
      );
    }

    console.log(
      "======================================"
    );

    console.log(
      "ADMIN CREATED SUCCESSFULLY"
    );

    console.log(
      "Email:",
      ADMIN_EMAIL
    );

    console.log(
      "Firebase UID:",
      firebaseUser.uid
    );

    console.log(
      "Role: admin"
    );

    console.log(
      "======================================"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Admin creation failed:",
      error
    );

    process.exit(1);
  }
};

createAdmin();