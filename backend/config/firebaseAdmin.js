import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cert } from "firebase-admin/app";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase service account JSON
const serviceAccountPath = path.join(
  __dirname,
  "..",
  "serviceAccountKey.json"
);

// Check whether file exists
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    "serviceAccountKey.json not found inside backend folder."
  );
}

// Read service account
const serviceAccount = JSON.parse(
  fs.readFileSync(
    serviceAccountPath,
    "utf8"
  )
);

// Initialize Firebase Admin
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

console.log(
  "Firebase Admin initialized successfully"
);

// Firebase Admin Authentication
export const adminAuth = getAuth(
  firebaseApp
);

export default firebaseApp;