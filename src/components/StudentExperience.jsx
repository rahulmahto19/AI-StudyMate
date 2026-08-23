import { motion } from "framer-motion";
import {
  Bot,
  CalendarDays,
  FileText,
  NotebookPen,
  Target,
  TrendingUp,
} from "lucide-react";

const items = [
  {
    icon: Bot,
    title: "AI Assistant",
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
  },
  {
    icon: NotebookPen,
    title: "Notes",
  },
  {
    icon: FileText,
    title: "PDF Summary",
  },
  {
    icon: Target,
    title: "Placement Prep",
  },
  {
    icon: TrendingUp,
    title: "Progress",
  },
];

function StudentExperience() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-slate-950 py-24 text-white"
    >

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        <div>

          <p className="font-semibold text-indigo-400">
            COMPLETE LEARNING EXPERIENCE
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            One Platform.
            <br />
            Your Complete Study Companion.
          </h2>

          <p className="mt-6 max-w-xl leading-7 text-slate-400">
            Bring your AI assistance, study planning, notes, PDF summaries,
            placement preparation, and progress tracking together in one
            intelligent workspace.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">

            {items.map((item) => {

              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Icon size={19} />
                  </div>

                  <span className="text-sm font-semibold">
                    {item.title}
                  </span>

                </motion.div>
              );

            })}

          </div>

        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-xs text-slate-500">
                  MY DASHBOARD
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  Learning Overview
                </h3>
              </div>

              <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                <Bot />
              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-800 p-5">

                <p className="text-sm text-slate-400">
                  Weekly Progress
                </p>

                <p className="mt-2 text-4xl font-black">
                  82%
                </p>

                <div className="mt-4 h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[82%] rounded-full bg-indigo-500" />
                </div>

              </div>

              <div className="rounded-2xl bg-slate-800 p-5">

                <p className="text-sm text-slate-400">
                  Study Hours
                </p>

                <p className="mt-2 text-4xl font-black">
                  18.5h
                </p>

                <p className="mt-2 text-xs text-green-400">
                  +12% this week
                </p>

              </div>

            </div>

            <div className="mt-4 rounded-2xl bg-slate-800 p-5">

              <p className="text-sm font-semibold">
                Today's Learning Plan
              </p>

              <div className="mt-4 space-y-3">

                {[
                  "React Hooks",
                  "JavaScript Promises",
                  "Aptitude Practice",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-slate-900 p-3"
                  >
                    <span className="text-sm text-slate-300">
                      {item}
                    </span>

                    <span
                      className={
                        index === 0
                          ? "text-xs text-green-400"
                          : "text-xs text-slate-500"
                      }
                    >
                      {index === 0 ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default StudentExperience;