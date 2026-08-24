import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebase";

// ==========================================
// GOOGLE PROVIDER
// ==========================================

const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// ==========================================
// GOOGLE LOGIN
// ==========================================

export const loginWithGoogle = async () => {
  try {
    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    return result.user;
  } catch (error) {
    console.error(
      "Google login error:",
      error
    );

    throw error;
  }
};

// ==========================================
// EMAIL + PASSWORD REGISTER
// ==========================================

export const registerWithEmail = async (
  name,
  email,
  password
) => {
  try {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    // Update Firebase user's display name
    await updateProfile(
      result.user,
      {
        displayName: name,
      }
    );

    // Return updated Firebase user
    return result.user;
  } catch (error) {
    console.error(
      "Email registration error:",
      error
    );

    throw error;
  }
};

// ==========================================
// EMAIL + PASSWORD LOGIN
// ==========================================

export const loginWithEmail = async (
  email,
  password
) => {
  try {
    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return result.user;
  } catch (error) {
    console.error(
      "Email login error:",
      error
    );

    throw error;
  }
};

// ==========================================
// PASSWORD RESET
// ==========================================

export const resetPassword = async (
  email
) => {
  try {
    await sendPasswordResetEmail(
      auth,
      email
    );

    console.log(
      "Password reset email sent successfully."
    );

    return true;
  } catch (error) {
    console.error(
      "Password reset error:",
      error
    );

    throw error;
  }
};

// ==========================================
// LOGOUT
// ==========================================

export const logout = async () => {
  try {
    await signOut(auth);

    console.log(
      "User logged out successfully."
    );
  } catch (error) {
    console.error(
      "Logout error:",
      error
    );

    throw error;
  }
};