import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "./firebase";

import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const loginWithGoogle =
  async () => {
    const provider =
      new GoogleAuthProvider();

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const firebaseUser =
      result.user;

    const idToken =
      await firebaseUser.getIdToken();

    const response =
      await axios.post(
        `${API_URL}/api/auth/google`,
        {
          idToken,
        }
      );

    return response.data;
  };