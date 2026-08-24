import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  GraduationCap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginWithGoogle,
  registerWithEmail,
} from "../config/auth";

function Register() {
  const navigate = useNavigate();

  // ==========================================
  // Form States
  // ==========================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // ==========================================
  // UI States
  // ==========================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // Firebase Error Messages
  // ==========================================

  const getFirebaseErrorMessage = (
    error
  ) => {
    switch (error?.code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists. Please login instead.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Password should be at least 6 characters.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/operation-not-allowed":
        return "Email and password registration is not enabled in Firebase.";

      case "auth/too-many-requests":
        return "Too many requests. Please try again later.";

      default:
        return (
          error?.message ||
          "Registration failed. Please try again."
        );
    }
  };

  // ==========================================
  // Backend Authentication
  // ==========================================

  const authenticateWithBackend = async (
    firebaseUser
  ) => {
    if (!firebaseUser) {
      throw new Error(
        "Firebase registration failed."
      );
    }

    // Get Firebase ID Token
    const idToken =
      await firebaseUser.getIdToken();

    console.log(
      "Firebase ID token received"
    );

    const apiUrl =
      import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      throw new Error(
        "VITE_API_URL is not configured."
      );
    }

    // Send token to backend
    const response = await fetch(
      `${apiUrl}/api/auth/google`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          idToken,
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      "Backend response:",
      data
    );

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Backend registration failed."
      );
    }

    if (!data.user) {
      throw new Error(
        "User information was not returned by the server."
      );
    }

    return data.user;
  };

  // ==========================================
  // Email Registration
  // ==========================================

  const handleEmailRegister = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      // ========================================
      // Validation
      // ========================================

      if (!name.trim()) {
        throw new Error(
          "Please enter your name."
        );
      }

      if (!email.trim()) {
        throw new Error(
          "Please enter your email address."
        );
      }

      if (!password) {
        throw new Error(
          "Please enter a password."
        );
      }

      if (password.length < 6) {
        throw new Error(
          "Password must be at least 6 characters."
        );
      }

      if (
        password !== confirmPassword
      ) {
        throw new Error(
          "Passwords do not match."
        );
      }

      // ========================================
      // Firebase Registration
      // ========================================

      const firebaseUser =
        await registerWithEmail(
          name.trim(),
          email.trim(),
          password
        );

      console.log(
        "Firebase registered user:",
        firebaseUser
      );

      // ========================================
      // Backend
      // ========================================

      const user =
        await authenticateWithBackend(
          firebaseUser
        );

      console.log(
        "MongoDB user:",
        user
      );

      // ========================================
      // Admin Protection
      // ========================================

      if (user.role === "admin") {
        setError(
          "Admin accounts cannot be created here. Please use the Login page."
        );

        return;
      }

      // ========================================
      // Only Student Registration
      // ========================================

      if (user.role !== "student") {
        throw new Error(
          "Only student accounts can be created from this page."
        );
      }

      // ========================================
      // Save User
      // ========================================

      localStorage.setItem(
        "studyMateUser",
        JSON.stringify(user)
      );

      // ========================================
      // Student Dashboard
      // ========================================

      navigate(
        "/student/dashboard",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Email registration error:",
        error
      );

      setError(
        getFirebaseErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Google Registration
  // ==========================================

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      // Firebase Google Registration/Login
      const firebaseUser =
        await loginWithGoogle();

      console.log(
        "Firebase Google user:",
        firebaseUser
      );

      // Backend
      const user =
        await authenticateWithBackend(
          firebaseUser
        );

      console.log(
        "MongoDB user:",
        user
      );

      // Admin cannot register
      if (user.role === "admin") {
        setError(
          "Admin accounts cannot be created here. Please use the Login page."
        );

        return;
      }

      // Only student
      if (user.role !== "student") {
        throw new Error(
          "Only student accounts can be created from this page."
        );
      }

      // Save user
      localStorage.setItem(
        "studyMateUser",
        JSON.stringify(user)
      );

      // Dashboard
      navigate(
        "/student/dashboard",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Google registration error:",
        error
      );

      setError(
        getFirebaseErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-10">

      {/* ======================================
          Background
      ======================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />

      </div>

      {/* ======================================
          Main Container
      ======================================= */}

      <div className="relative w-full max-w-md">

        {/* ====================================
            Logo
        ===================================== */}

        <div className="mb-7 flex justify-center">

          <div className="flex items-center gap-3">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200">

              <BookOpen size={23} />

              <Sparkles
                size={11}
                className="absolute -right-1 -top-1"
              />

            </div>

            <div>

              <h1 className="text-lg font-black text-slate-900">
                AI StudyMate
              </h1>

              <p className="text-xs text-slate-400">
                Learn Smarter
              </p>

            </div>

          </div>

        </div>

        {/* ====================================
            Registration Card
        ===================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">

          {/* ==================================
              Heading
          =================================== */}

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

              <GraduationCap
                size={27}
              />

            </div>

            <h2 className="mt-5 text-3xl font-black text-slate-900">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Start your smarter learning journey.
            </p>

          </div>

          {/* ==================================
              Error
          =================================== */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* ==================================
              Email Registration Form
          =================================== */}

          <form
            onSubmit={
              handleEmailRegister
            }
            className="mt-8 space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your name"
                  autoComplete="name"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Password must contain at least 6 characters.
              </p>

            </div>

            {/* Confirm Password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>

            {/* Create Account */}

            <button
              type="submit"
              disabled={
                loading ||
                !name.trim() ||
                !email.trim() ||
                !password ||
                !confirmPassword
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                "Create Student Account"
              )}

            </button>

          </form>

          {/* ==================================
              OR
          =================================== */}

          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          {/* ==================================
              Google Registration
          =================================== */}

          <button
            type="button"
            onClick={
              handleGoogleRegister
            }
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >

            {loading ? (
              <Loader2
                size={19}
                className="animate-spin text-indigo-600"
              />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-lg font-black text-indigo-600 shadow-sm">
                G
              </span>
            )}

            {loading
              ? "Please wait..."
              : "Continue with Google"}

          </button>

          {/* ==================================
              Student Information
          =================================== */}

          <div className="mt-5 rounded-2xl bg-indigo-50 p-4">

            <div className="flex gap-3">

              <GraduationCap
                size={18}
                className="mt-0.5 shrink-0 text-indigo-600"
              />

              <div>

                <p className="text-xs font-bold text-indigo-700">
                  Student Account
                </p>

                <p className="mt-1 text-[10px] leading-5 text-indigo-600">
                  Accounts created here are automatically registered as student accounts. Admin accounts cannot be created from this page.
                </p>

              </div>

            </div>

          </div>

          {/* ==================================
              Security
          =================================== */}

          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-400">

            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            Secure authentication powered by Firebase

          </div>

          {/* ==================================
              Login
          =================================== */}

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-xs text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-1 inline-block text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              Login to AI StudyMate
            </Link>

          </div>

          {/* ==================================
              Back Home
          =================================== */}

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-indigo-600"
          >

            <ArrowLeft size={14} />

            Back to Home

          </Link>

        </div>

        {/* Footer */}

        <p className="mt-6 text-center text-xs text-slate-400">
          AI-powered learning made simple.
        </p>

      </div>

    </div>
  );
}

export default Register;