import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginWithGoogle,
  loginWithEmail,
} from "../config/auth";

function Login() {
  const navigate = useNavigate();

  // ==========================================
  // States
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
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
      case "auth/invalid-credential":
        return "Invalid email or password.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-disabled":
        return "This account has been disabled.";

      case "auth/too-many-requests":
        return "Too many login attempts. Please try again later.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      default:
        return (
          error?.message ||
          "Login failed. Please try again."
        );
    }
  };

  // ==========================================
  // Send Firebase User To Backend
  // ==========================================

  const authenticateWithBackend = async (
    firebaseUser
  ) => {
    if (!firebaseUser) {
      throw new Error(
        "Firebase authentication failed."
      );
    }

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
          "Backend authentication failed."
      );
    }

    if (!data.user) {
      throw new Error(
        "User information was not returned by the server."
      );
    }

    // Save MongoDB user information
    localStorage.setItem(
      "studyMateUser",
      JSON.stringify(data.user)
    );

    return data.user;
  };

  // ==========================================
  // Redirect According To Role
  // ==========================================

  const redirectUser = (user) => {
    if (!user?.role) {
      throw new Error(
        "User role was not returned by the server."
      );
    }

    if (user.role === "admin") {
      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

      return;
    }

    if (user.role === "student") {
      navigate(
        "/student/dashboard",
        {
          replace: true,
        }
      );

      return;
    }

    throw new Error(
      "Invalid user role."
    );
  };

  // ==========================================
  // Email + Password Login
  // ==========================================

  const handleEmailLogin = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Basic validation
      if (!email.trim()) {
        throw new Error(
          "Please enter your email address."
        );
      }

      if (!password) {
        throw new Error(
          "Please enter your password."
        );
      }

      // Firebase Email Login
      const firebaseUser =
        await loginWithEmail(
          email.trim(),
          password
        );

      console.log(
        "Firebase email user:",
        firebaseUser
      );

      // Backend authentication
      const user =
        await authenticateWithBackend(
          firebaseUser
        );

      console.log(
        "Authenticated MongoDB user:",
        user
      );

      // Redirect
      redirectUser(user);
    } catch (error) {
      console.error(
        "Email login error:",
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
  // Google Login
  // ==========================================

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Firebase Google Login
      const firebaseUser =
        await loginWithGoogle();

      console.log(
        "Firebase Google user:",
        firebaseUser
      );

      // Backend authentication
      const user =
        await authenticateWithBackend(
          firebaseUser
        );

      console.log(
        "Authenticated MongoDB user:",
        user
      );

      // Redirect
      redirectUser(user);
    } catch (error) {
      console.error(
        "Google login error:",
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

      {/* ========================================
          Background Decoration
      ========================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />

      </div>

      {/* ========================================
          Main Container
      ========================================= */}

      <div className="relative w-full max-w-md">

        {/* ======================================
            Logo
        ======================================= */}

        <div className="mb-7 flex justify-center">

          <div className="flex items-center gap-3">

            {/* Logo Icon */}

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200">

              <BookOpen size={23} />

              <Sparkles
                size={11}
                className="absolute -right-1 -top-1"
              />

            </div>

            {/* Logo Text */}

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

        {/* ======================================
            Login Card
        ======================================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">

          {/* ====================================
              Heading
          ===================================== */}

          <div className="text-center">

            <h2 className="text-3xl font-black text-slate-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue your learning journey.
            </p>

          </div>

          {/* ====================================
              Error Message
          ===================================== */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* ====================================
              Email Login Form
          ===================================== */}

          <form
            onSubmit={handleEmailLogin}
            className="mt-8 space-y-5"
          >

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
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <Link
  to="/forgot-password"
  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
>
  Forgot password?
</Link>

              </div>

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
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
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>

            {/* Email Login Button */}

            <button
              type="submit"
              disabled={
                loading ||
                !email ||
                !password
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Signing in...
                </>
              ) : (
                "Login with Email"
              )}

            </button>

          </form>

          {/* ====================================
              OR Separator
          ===================================== */}

          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          {/* ====================================
              Google Login
          ===================================== */}

          <button
            type="button"
            onClick={handleGoogleLogin}
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

          {/* ====================================
              Security
          ===================================== */}

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400">

            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            Secure authentication powered by Firebase

          </div>

          {/* ====================================
              Register
          ===================================== */}

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-xs text-slate-500">
              Don't have a student account?
            </p>

            <Link
              to="/register"
              className="mt-1 inline-block text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              Create Student Account
            </Link>

          </div>

          {/* ====================================
              Back Home
          ===================================== */}

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-indigo-600"
          >

            <ArrowLeft size={14} />

            Back to Home

          </Link>

        </div>

        {/* ======================================
            Footer
        ======================================= */}

        <p className="mt-6 text-center text-xs text-slate-400">
          AI-powered learning made simple.
        </p>

      </div>

    </div>
  );
}

export default Login;