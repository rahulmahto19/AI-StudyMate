import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Mail,
  CheckCircle,
  KeyRound,
} from "lucide-react";

import { resetPassword } from "../config/auth";

function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  // ==========================================
  // Firebase Error Messages
  // ==========================================

  const getFirebaseErrorMessage = (
    error
  ) => {
    switch (error?.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-not-found":
        return "No account was found with this email.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/too-many-requests":
        return "Too many requests. Please try again later.";

      default:
        return (
          error?.message ||
          "Unable to send password reset email."
        );
    }
  };

  // ==========================================
  // Send Reset Email
  // ==========================================

  const handleResetPassword = async (
    event
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      if (!email.trim()) {
        setError(
          "Please enter your email address."
        );

        return;
      }

      await resetPassword(
        email.trim()
      );

      setSuccess(true);
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setError(
        getFirebaseErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-10">

      {/* ======================================
          Background
      ======================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

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
            Card
        ===================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">

          {!success ? (
            <>
              {/* ==================================
                  Heading
              =================================== */}

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                  <KeyRound size={27} />

                </div>

                <h2 className="mt-5 text-3xl font-black text-slate-900">
                  Reset Password
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your email address and
                  we'll send you a link to reset
                  your password.
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
                  Form
              =================================== */}

              <form
                onSubmit={
                  handleResetPassword
                }
                className="mt-8"
              >

                <label
                  htmlFor="reset-email"
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
                    id="reset-email"
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

                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !email.trim()
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Sending reset link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}

                </button>

              </form>
            </>
          ) : (
            /* ====================================
               Success
            ===================================== */

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">

                <CheckCircle
                  size={34}
                />

              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Check Your Email
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We've sent a password reset
                link to:
              </p>

              <p className="mt-2 break-all font-semibold text-indigo-600">
                {email}
              </p>

              <div className="mt-6 rounded-2xl bg-indigo-50 p-4 text-left">

                <p className="text-xs font-bold text-indigo-700">
                  What to do next
                </p>

                <ul className="mt-2 space-y-2 text-xs leading-5 text-indigo-600">

                  <li>
                    • Open the email from
                    Firebase.
                  </li>

                  <li>
                    • Click the reset password
                    link.
                  </li>

                  <li>
                    • Create your new password.
                  </li>

                  <li>
                    • Return to AI StudyMate
                    and log in.
                  </li>

                </ul>

              </div>

              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Send to another email
              </button>

            </div>
          )}

          {/* ====================================
              Security
          ===================================== */}

          <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-[10px] text-slate-400">

            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            Secure password recovery powered
            by Firebase

          </div>

          {/* ====================================
              Back Login
          ===================================== */}

          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-indigo-600"
          >

            <ArrowLeft size={14} />

            Back to Login

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

export default ForgotPassword;