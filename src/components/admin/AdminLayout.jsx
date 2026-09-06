import { useState } from "react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  StickyNote,
  Mic,
  CalendarDays,
  TrendingUp,
  BriefcaseBusiness,
  ClipboardList,
  HelpCircle,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  UserCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "User Management",
    items: [
      {
        label: "Users",
        path: "/admin/users",
        icon: Users,
      },
    ],
  },

  {
    label: "Learning Management",
    items: [
      {
        label: "AI Chat",
        path: "/admin/ai-chat",
        icon: MessageSquare,
      },
      {
        label: "PDF Summary",
        path: "/admin/pdf-summary",
        icon: FileText,
      },
      {
        label: "Notes",
        path: "/admin/notes",
        icon: StickyNote,
      },
      {
        label: "Voice Notes",
        path: "/admin/voice-notes",
        icon: Mic,
      },
      {
        label: "Study Planner",
        path: "/admin/study-planner",
        icon: CalendarDays,
      },
      {
        label: "Progress",
        path: "/admin/progress",
        icon: TrendingUp,
      },
    ],
  },

  {
    label: "Placement Preparation",
    items: [
      {
        label: "Overview",
        path: "/admin/placement",
        icon: BriefcaseBusiness,
      },
      {
        label: "Tests",
        path: "/admin/placement/tests",
        icon: ClipboardList,
      },
      {
        label: "Question Bank",
        path: "/admin/placement/questions",
        icon: HelpCircle,
      },
      {
        label: "Results",
        path: "/admin/placement/results",
        icon: Trophy,
      },
      {
        label: "Students",
        path: "/admin/placement/students",
        icon: Users,
      },
      {
        label: "Analytics",
        path: "/admin/placement/analytics",
        icon: BarChart3,
      },

      /* =====================================================
         NEW: RESUME-BASED INTERVIEW
      ===================================================== */

      {
        label: "Resume Interview",
        path: "/admin/placement/resume-interview",
        icon: Sparkles,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
      },
      {
        label: "Profile",
        path: "/admin/profile",
        icon: UserCircle,
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  collapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
         DESKTOP SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50 hidden h-screen
          border-r border-slate-200 bg-white
          transition-all duration-300
          lg:block
          ${collapsed ? "w-[76px]" : "w-[260px]"}
        `}
      >
        <div className="flex h-full flex-col">

          {/* =================================================
             LOGO
          ================================================= */}

          <div
            className={`
              flex h-16 items-center border-b border-slate-100
              ${collapsed ? "justify-center" : "px-5"}
            `}
          >
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                <GraduationCap size={20} />
              </div>

              {!collapsed && (
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">
                    AI StudyMate
                  </p>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-500">
                    Admin Portal
                  </p>
                </div>
              )}
            </button>
          </div>

          {/* =================================================
             NAVIGATION
          ================================================= */}

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navigation.map((section) => (
              <div
                key={section.label}
                className="mb-5"
              >
                {!collapsed && (
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {section.label}
                  </p>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        title={
                          collapsed
                            ? item.label
                            : undefined
                        }
                        className={({ isActive }) =>
                          `
                            group flex items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            transition-all duration-200
                            ${
                              isActive
                                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }
                            ${collapsed ? "justify-center" : ""}
                          `
                        }
                      >
                        <Icon
                          size={18}
                          className="shrink-0"
                        />

                        {!collapsed && (
                          <span className="flex-1">
                            {item.label}
                          </span>
                        )}

                        {/* Small indicator for Resume Interview */}
                        {!collapsed &&
                          item.label === "Resume Interview" && (
                            <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600">
                              AI
                            </span>
                          )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* =================================================
             BOTTOM / LOGOUT
          ================================================= */}

          <div className="border-t border-slate-100 p-3">
            <button
              onClick={handleLogout}
              className={`
                flex w-full items-center gap-3 rounded-xl
                px-3 py-2.5 text-sm font-medium
                text-slate-500 transition
                hover:bg-red-50 hover:text-red-600
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <LogOut size={18} />

              {!collapsed && (
                <span>
                  Sign out
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================
         MOBILE SIDEBAR
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">

                {/* =================================================
                   MOBILE LOGO
                ================================================= */}

                <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                      <GraduationCap size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        AI StudyMate
                      </p>

                      <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-500">
                        Admin Portal
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* =================================================
                   MOBILE NAVIGATION
                ================================================= */}

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                  {navigation.map((section) => (
                    <div
                      key={section.label}
                      className="mb-5"
                    >
                      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {section.label}
                      </p>

                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;

                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() =>
                                setMobileOpen(false)
                              }
                              className={({ isActive }) =>
                                `
                                  flex items-center gap-3
                                  rounded-xl px-3 py-2.5
                                  text-sm font-medium
                                  transition-all
                                  ${
                                    isActive
                                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                  }
                                `
                              }
                            >
                              <Icon
                                size={18}
                                className="shrink-0"
                              />

                              <span className="flex-1">
                                {item.label}
                              </span>

                              {item.label ===
                                "Resume Interview" && (
                                <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600">
                                  AI
                                </span>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* =================================================
                   MOBILE LOGOUT
                ================================================= */}

                <div className="border-t border-slate-100 p-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut size={18} />

                    <span>
                      Sign out
                    </span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  collapsed,
  setCollapsed,
  setMobileOpen,
}) {
  const location = useLocation();

  const currentPath = location.pathname;

  let pageName = "Dashboard";

  navigation.forEach((section) => {
    section.items.forEach((item) => {
      if (item.path === currentPath) {
        pageName = item.label;
      }
    });
  });

  return (
    <header
      className={`
        fixed right-0 top-0 z-30 h-16
        border-b border-slate-200 bg-white/90
        backdrop-blur-xl
        transition-all duration-300
        ${
          collapsed
            ? "lg:left-[76px]"
            : "lg:left-[260px]"
        }
        left-0
      `}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* =================================================
           LEFT HEADER
        ================================================= */}

        <div className="flex items-center gap-3">

          {/* Mobile menu */}

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Desktop collapse */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:flex"
          >
            {collapsed ? (
              <ChevronRight size={19} />
            ) : (
              <ChevronLeft size={19} />
            )}
          </button>

          {/* Page name */}

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {pageName}
            </p>

            <p className="hidden text-xs text-slate-400 sm:block">
              AI StudyMate Administration
            </p>
          </div>
        </div>

        {/* =================================================
           RIGHT HEADER
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}

          <button
            className="hidden rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:block"
            title="Search"
          >
            <Search size={18} />
          </button>

          {/* Notification */}

          <button
            className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Notifications"
          >
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}

          <div className="ml-1 hidden h-7 w-px bg-slate-200 sm:block" />

          {/* Admin profile */}

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-800">
                Admin
              </p>

              <p className="text-[10px] text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   ADMIN LAYOUT
========================================================= */

export default function AdminLayout() {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
         SIDEBAR
      ===================================================== */}

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* =====================================================
         HEADER
      ===================================================== */}

      <Header
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setMobileOpen={setMobileOpen}
      />

      {/* =====================================================
         MAIN CONTENT
      ===================================================== */}

      <main
        className={`
          min-h-screen pt-16
          transition-all duration-300
          ${
            collapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[260px]"
          }
        `}
      >
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}