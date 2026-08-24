import { auth } from "../../config/firebase";

// ==========================================
// API URL
// ==========================================

const API_URL =
  import.meta.env.VITE_API_URL;

// ==========================================
// GET FIREBASE TOKEN
// ==========================================

const getAuthToken =
  async () => {
    const firebaseUser =
      auth.currentUser;

    if (!firebaseUser) {
      throw new Error(
        "You are not logged in."
      );
    }

    return await firebaseUser.getIdToken(
      true
    );
  };

// ==========================================
// GET PROFILE
// ==========================================

export const getMyProfile =
  async () => {
    const token =
      await getAuthToken();

    const response =
      await fetch(
        `${API_URL}/api/profile`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Failed to load profile."
      );
    }

    return data;
  };

// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateMyProfile =
  async (name) => {
    const token =
      await getAuthToken();

    const response =
      await fetch(
        `${API_URL}/api/profile`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Failed to update profile."
      );
    }

    return data;
  };