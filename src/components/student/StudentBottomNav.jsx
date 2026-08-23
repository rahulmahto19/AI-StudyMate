import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  NotebookPen,
  Mic,
  CalendarDays,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

const navigationItems = [
  {
    name: "Home",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "AI Chat",
    path: "/student/chat",
    icon: MessageCircle,
  },
  {
    name: "PDF",
    path: "/student/pdf-summary",
    icon: FileText,
  },
  {
    name: "Notes",
    path: "/student/notes",
    icon: NotebookPen,
  },
  {
    name: "Voice",
    path: "/student/voice-notes",
    icon: Mic,
  },
  {
    name: "Planner",
    path: "/student/planner",
    icon: CalendarDays,
  },
  {
    name: "Placement",
    path: "/student/placement",
    icon: BriefcaseBusiness,
  },
  {
    name: "Progress",
    path: "/student/progress",
    icon: TrendingUp,
  },
];

function StudentBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-5px_25px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <div className="mx-auto max-w-7xl overflow-x-auto px-2 sm:px-4">

        <div className="flex min-w-max items-center justify-center gap-1 py-2">

          {navigationItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex min-w-[72px] flex-col items-center justify-center
                  rounded-xl px-3 py-2 text-[11px] font-medium transition-all
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                  }`
                }
              >

                {({ isActive }) => (
                  <>
                    <div
                      className={`mb-1 flex h-7 w-7 items-center justify-center rounded-lg transition ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "text-slate-500"
                      }`}
                    >
                      <Icon size={16} />
                    </div>

                    <span>
                      {item.name}
                    </span>
                  </>
                )}

              </NavLink>
            );

          })}

        </div>

      </div>

    </nav>
  );
}

export default StudentBottomNav;