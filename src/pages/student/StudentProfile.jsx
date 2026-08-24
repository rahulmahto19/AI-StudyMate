import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  UserCircle,
  Mail,
  ShieldCheck,
  LogOut,
  Pencil,
  Save,
  X,
  CalendarDays,
  CheckCircle2,
  Loader2,
  AlertCircle,
  KeyRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// IMPORTANT:
// StudentProfile.jsx is inside:
// src/pages/student/
//
// config is inside:
// src/config/
//
// Therefore we need ../../
import { auth } from "../../config/firebase";

import {
  logout,
} from "../../config/auth";

// profileService.js is inside:
// src/pages/services/
//
// Therefore from student folder:
// ../services/profileService
import {
  getMyProfile,
  updateMyProfile,
} from "../services/profileService";

// ==========================================
// COMPONENT
// ==========================================

function StudentProfile() {
  const navigate = useNavigate();

  // ========================================
  // STATE
  // ========================================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedName, setEditedName] =
    useState("");

  const [showLogoutMessage, setShowLogoutMessage] =
    useState(false);

  // ========================================
  // LOAD PROFILE
  // ========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getMyProfile();

        setUser(data.user);

        setEditedName(
          data.user.name || ""
        );
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );

        setError(
          error.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

  // ========================================
  // SAVE PROFILE
  // ========================================

  const handleSave =
    async () => {
      try {
        setSaving(true);
        setError("");
        setSuccess("");

        if (
          !editedName.trim()
        ) {
          setError(
            "Name cannot be empty."
          );

          return;
        }

        const data =
          await updateMyProfile(
            editedName.trim()
          );

        setUser(data.user);

        setEditedName(
          data.user.name
        );

        setIsEditing(false);

        setSuccess(
          "Profile updated successfully."
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error) {
        console.error(
          "Profile update error:",
          error
        );

        setError(
          error.message ||
            "Failed to update profile."
        );
      } finally {
        setSaving(false);
      }
    };

  // ========================================
  // CANCEL EDIT
  // ========================================

  const handleCancel =
    () => {
      setEditedName(
        user?.name || ""
      );

      setIsEditing(false);
      setError("");
    };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout =
    async () => {
      try {
        setError("");

        await logout();

        localStorage.removeItem(
          "studyMateUser"
        );

        setShowLogoutMessage(
          true
        );

        setTimeout(() => {
          navigate(
            "/login",
            {
              replace: true,
            }
          );
        }, 800);
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );

        setError(
          "Logout failed. Please try again."
        );
      }
    };

  // ========================================
  // PROFILE COMPLETION
  // ========================================

  const calculateCompletion =
    () => {
      if (!user) {
        return 0;
      }

      let completed = 0;
      const total = 4;

      if (
        user.name &&
        user.name.trim()
      ) {
        completed++;
      }

      if (
        user.email &&
        user.email.trim()
      ) {
        completed++;
      }

      if (
        user.photoURL
      ) {
        completed++;
      }

      if (
        user.provider
      ) {
        completed++;
      }

      return Math.round(
        (completed / total) * 100
      );
    };

  // ========================================
  // AUTH METHOD
  // ========================================

  const getAuthMethod =
    () => {
      if (
        user?.provider ===
        "password"
      ) {
        return "Email & Password";
      }

      if (
        user?.provider ===
        "google"
      ) {
        return "Google Authentication";
      }

      return (
        user?.provider ||
        "Firebase Authentication"
      );
    };

  // ========================================
  // DATE FORMATTER
  // ========================================

  const formatDate =
    (date) => {
      if (!date) {
        return "Not available";
      }

      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">

          <Loader2
            size={32}
            className="animate-spin text-indigo-600"
          />

          <p className="text-sm text-slate-500">
            Loading your profile...
          </p>

        </div>
      </div>
    );
  }

  // ========================================
  // ERROR WITHOUT USER
  // ========================================

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">

        <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">

          <AlertCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-xl font-black text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error ||
              "Please login again."}
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Go to Login
          </button>

        </div>

      </div>
    );
  }

  const completion =
    calculateCompletion();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >

        <div>

          <p className="text-xs font-bold tracking-wider text-indigo-600">
            ACCOUNT
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your account information and learning profile.
          </p>

        </div>

        {!isEditing ? (
          <button
            onClick={() =>
              setIsEditing(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
          >
            <Pencil size={15} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">

            <button
              onClick={
                handleCancel
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={15} />
              Cancel
            </button>

            <button
              onClick={
                handleSave
              }
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <Save size={15} />
              )}

              {saving
                ? "Saving..."
                : "Save"}

            </button>

          </div>
        )}

      </motion.div>

      {/* ======================================
          SUCCESS
      ======================================= */}

      {success && (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

          <CheckCircle2
            size={18}
          />

          {success}

        </div>
      )}

      {/* ======================================
          ERROR
      ======================================= */}

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">

          <AlertCircle
            size={18}
          />

          {error}

        </div>
      )}

      {/* ======================================
          PROFILE + COMPLETION
      ======================================= */}

      <div className="mt-7 grid gap-6 lg:grid-cols-3">

        {/* PROFILE CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >

          {/* Profile Header */}

          <div className="flex flex-col items-center gap-5 border-b border-slate-100 pb-7 sm:flex-row">

            {/* Profile Image */}

            <div className="relative">

              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 ring-4 ring-indigo-50">

                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle
                    size={65}
                  />
                )}

              </div>

            </div>

            {/* User Info */}

            <div className="flex-1 text-center sm:text-left">

              {isEditing ? (
                <div className="mx-auto sm:mx-0">

                  <label className="text-xs font-semibold text-slate-400">
                    Display Name
                  </label>

                  <input
                    value={
                      editedName
                    }
                    onChange={(e) =>
                      setEditedName(
                        e.target.value
                      )
                    }
                    maxLength={50}
                    className="mt-2 w-full max-w-sm rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />

                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-slate-900">
                    {user.name}
                  </h2>

                  <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600">

                      {user.role ===
                      "admin"
                        ? "Admin"
                        : "Student"}

                    </span>

                    {user.isActive && (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">

                        <CheckCircle2
                          size={12}
                        />

                        Active

                      </span>
                    )}

                  </div>
                </>
              )}

            </div>

          </div>

          {/* ACCOUNT INFORMATION */}

          <div className="mt-7">

            <h3 className="text-sm font-black text-slate-900">
              Account Information
            </h3>

            <div className="mt-4 space-y-3">

              <ProfileItem
                icon={
                  <UserCircle
                    size={19}
                  />
                }
                label="Name"
                value={
                  user.name
                }
              />

              <ProfileItem
                icon={
                  <Mail
                    size={19}
                  />
                }
                label="Email"
                value={
                  user.email
                }
              />

              <ProfileItem
                icon={
                  <ShieldCheck
                    size={19}
                  />
                }
                label="Authentication"
                value={
                  getAuthMethod()
                }
              />

              <ProfileItem
                icon={
                  <CalendarDays
                    size={19}
                  />
                }
                label="Account Created"
                value={formatDate(
                  user.createdAt
                )}
              />

              <ProfileItem
                icon={
                  <KeyRound
                    size={19}
                  />
                }
                label="Last Login"
                value={formatDate(
                  user.lastLogin
                )}
              />

            </div>

          </div>

        </motion.div>

        {/* PROFILE COMPLETION */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Profile
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Completion
              </h2>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <UserCircle
                size={21}
              />

            </div>

          </div>

          {/* Progress */}

          <div className="mt-7 flex justify-center">

            <div
              className="relative flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background:
                  `conic-gradient(#4f46e5 ${completion * 3.6}deg, #e2e8f0 0deg)`,
              }}
            >

              <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white">

                <div className="text-center">

                  <p className="text-3xl font-black text-slate-900">
                    {completion}%
                  </p>

                  <p className="text-[10px] font-medium text-slate-400">
                    Complete
                  </p>

                </div>

              </div>

            </div>

          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Complete your profile to get better personalized recommendations from AI StudyMate.
          </p>

          {!isEditing && (
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="mt-5 w-full rounded-xl bg-indigo-50 py-3 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
            >
              Edit Profile
            </button>
          )}

        </motion.div>

      </div>

      {/* ======================================
          ACCOUNT DETAILS
      ======================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="mt-6"
      >

        <div className="mb-4">

          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Account Details
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            Your Account
          </h2>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <StatCard
            title="Role"
            value={
              user.role ===
              "admin"
                ? "Admin"
                : "Student"
            }
            description="Account role"
          />

          <StatCard
            title="Status"
            value={
              user.isActive
                ? "Active"
                : "Inactive"
            }
            description="Account status"
          />

          <StatCard
            title="Provider"
            value={
              user.provider ===
              "password"
                ? "Email"
                : "Google"
            }
            description="Login provider"
          />

        </div>

      </motion.section>

      {/* ======================================
          SECURITY
      ======================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
        }}
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

            <ShieldCheck
              size={21}
            />

          </div>

          <div>

            <h2 className="text-lg font-black text-slate-900">
              Account Security
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Your authentication information.
            </p>

          </div>

        </div>

        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

          <div className="flex gap-3">

            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <div>

              <p className="text-xs font-bold text-emerald-700">
                {getAuthMethod()}
              </p>

              <p className="mt-1 text-[10px] leading-5 text-emerald-600">
                Your account is securely authenticated through Firebase Authentication.
              </p>

            </div>

          </div>

        </div>

      </motion.section>

      {/* ======================================
          LOGOUT
      ======================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="mt-6 rounded-3xl border border-red-100 bg-red-50/50 p-6"
      >

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <h2 className="text-sm font-black text-slate-900">
              Sign Out
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Sign out from your AI StudyMate account.
            </p>

          </div>

          <button
            onClick={
              handleLogout
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700"
          >

            <LogOut
              size={16}
            />

            Logout

          </button>

        </div>

      </motion.div>

      {/* ======================================
          LOGOUT MESSAGE
      ======================================= */}

      {showLogoutMessage && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-2xl"
        >

          <CheckCircle2
            size={18}
            className="text-emerald-400"
          />

          <div>

            <p className="text-sm font-bold">
              Logged Out
            </p>

            <p className="mt-0.5 text-[10px] text-slate-300">
              Redirecting to login...
            </p>

          </div>

        </motion.div>
      )}

    </div>
  );
}

// ==========================================
// PROFILE ITEM
// ==========================================

function ProfileItem({
  icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-indigo-50/50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
          {value || "Not available"}
        </p>

      </div>

    </motion.div>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({
  title,
  value,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/30"
    >

      <p className="text-xs text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">
        {description}
      </p>

    </motion.div>
  );
}

export default StudentProfile;