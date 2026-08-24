import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  Sparkles,
  Bell,
  UserCircle,
} from "lucide-react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase";

function StudentHeader() {
  const [user, setUser] = useState(null);

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================
  // GET USER NAME
  // ==========================================

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* ======================================
            LOGO
        ======================================= */}

        <Link
          to="/student/dashboard"
          className="flex items-center gap-3"
        >

          <div
            className="
              relative flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600 to-purple-600
              text-white
              shadow-lg shadow-indigo-200
            "
          >

            <BookOpen size={22} />

            <Sparkles
              size={12}
              className="absolute -right-1 -top-1"
            />

          </div>

          <div>

            <h1 className="text-lg font-bold text-slate-900">
              AI StudyMate
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>

          </div>

        </Link>

        {/* ======================================
            RIGHT SIDE
        ======================================= */}

        <div className="flex items-center gap-3">

          {/* ====================================
              NOTIFICATION
          ===================================== */}

          <button
            type="button"
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-indigo-600
            "
          >

            <Bell size={20} />

            <span
              className="
                absolute right-2 top-2
                h-2 w-2
                rounded-full
                bg-red-500
              "
            />

          </button>

          {/* ====================================
              PROFILE
          ===================================== */}

          <Link
            to="/student/profile"
            className="
              group flex items-center gap-3
              rounded-xl px-2 py-1.5
              transition hover:bg-slate-100
            "
          >

            {/* Profile Image */}

            {user?.photoURL ? (

              <img
                src={user.photoURL}
                alt={userName}
                className="
                  h-10 w-10
                  rounded-xl
                  object-cover
                  ring-2 ring-indigo-100
                "
              />

            ) : (

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  transition
                  group-hover:bg-indigo-600
                  group-hover:text-white
                "
              >

                <UserCircle size={23} />

              </div>

            )}

            {/* User Information */}

            <div className="hidden text-left sm:block">

              <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
                {userName}
              </p>

              <p className="text-xs text-slate-500">
                Student
              </p>

            </div>

          </Link>

        </div>

      </div>

    </header>
  );
}

export default StudentHeader;