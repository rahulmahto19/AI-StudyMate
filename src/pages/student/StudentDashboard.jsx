import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  NotebookPen,
  Mic,
  CalendarDays,
  BriefcaseBusiness,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
  Target,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";


/* ---------------------------------------------------
   Animation Variants
--------------------------------------------------- */

const pageVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};


const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


/* ---------------------------------------------------
   Quick Actions
--------------------------------------------------- */

const quickActions = [
  {
    title: "AI Chat",
    description: "Ask questions and learn with your AI assistant.",
    icon: MessageCircle,
    path: "/student/chat",
    gradient: "from-indigo-500 to-blue-500",
  },

  {
    title: "PDF Summary",
    description: "Turn long study PDFs into simple summaries.",
    icon: FileText,
    path: "/student/pdf-summary",
    gradient: "from-purple-500 to-indigo-500",
  },

  {
    title: "My Notes",
    description: "Create and organize all your study notes.",
    icon: NotebookPen,
    path: "/student/notes",
    gradient: "from-blue-500 to-cyan-500",
  },

  {
    title: "Voice Notes",
    description: "Record lectures and important study ideas.",
    icon: Mic,
    path: "/student/voice-notes",
    gradient: "from-violet-500 to-purple-500",
  },

  {
    title: "Study Planner",
    description: "Plan your study time and stay consistent.",
    icon: CalendarDays,
    path: "/student/planner",
    gradient: "from-indigo-500 to-violet-500",
  },

  {
    title: "Placement",
    description: "Practice aptitude and prepare for interviews.",
    icon: BriefcaseBusiness,
    path: "/student/placement",
    gradient: "from-purple-500 to-pink-500",
  },
];


/* ---------------------------------------------------
   Study Tasks
--------------------------------------------------- */

const studyTasks = [
  {
    subject: "React.js",
    task: "React Hooks",
    time: "09:00 AM",
    duration: "45 min",
    status: "Completed",
  },

  {
    subject: "JavaScript",
    task: "Promises & Async/Await",
    time: "11:00 AM",
    duration: "60 min",
    status: "In Progress",
  },

  {
    subject: "Aptitude",
    task: "Time & Work",
    time: "04:00 PM",
    duration: "30 min",
    status: "Upcoming",
  },
];


/* ---------------------------------------------------
   Dashboard
--------------------------------------------------- */

function StudentDashboard() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >

      {/* ===============================================
          Welcome Section
      =============================================== */}

      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white shadow-xl shadow-indigo-200/60 sm:p-8 lg:p-10"
      >

        {/* Animated Background Glow */}

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"
        />

        {/* Decorative circles */}

        <div className="absolute right-20 top-10 h-2 w-2 rounded-full bg-white/60" />

        <div className="absolute right-40 top-24 h-1.5 w-1.5 rounded-full bg-white/40" />

        <div className="absolute bottom-10 right-1/3 h-2 w-2 rounded-full bg-white/40" />


        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

          {/* Welcome Text */}

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles size={15} />
              </motion.div>

              <span className="text-xs font-medium text-indigo-100">
                AI StudyMate
              </span>

            </div>


            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Good Morning, Rahul! 👋
            </h1>


            <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
              Ready to continue your learning journey?
              Let's make today productive and reach your goals.
            </p>


            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                to="/student/planner"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >

                Continue Learning

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/student/chat"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >

                <MessageCircle size={16} />

                Ask AI

              </Link>

            </div>

          </div>


          {/* Progress Card */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-indigo-100">
                  Today's Progress
                </p>

                <p className="mt-1 text-4xl font-black">
                  78%
                </p>

              </div>


              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Target size={24} />
              </div>

            </div>


            {/* Animated Progress */}

            <div className="mt-5">

              <div className="flex justify-between text-xs text-indigo-100">

                <span>
                  Daily goal
                </span>

                <span>
                  3.1 / 4 hrs
                </span>

              </div>


              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-white"
                />

              </div>

            </div>


            <div className="mt-5 flex items-center gap-2 text-xs text-indigo-100">

              <CheckCircle2 size={15} />

              You're ahead of your weekly goal!

            </div>

          </motion.div>

        </div>

      </motion.section>


      {/* ===============================================
          Statistics
      =============================================== */}

      <motion.section
        variants={itemVariants}
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >

        <StatCard
          title="Study Hours"
          value="18.5h"
          subtitle="+12% this week"
          icon={Clock3}
        />

        <StatCard
          title="Completed Tasks"
          value="24"
          subtitle="This month"
          icon={CheckCircle2}
        />

        <StatCard
          title="Study Streak"
          value="7 Days"
          subtitle="Keep going!"
          icon={TrendingUp}
        />

        <StatCard
          title="Placement Score"
          value="82%"
          subtitle="Good performance"
          icon={BriefcaseBusiness}
        />

      </motion.section>


      {/* ===============================================
          Quick Actions
      =============================================== */}

      <motion.section
        variants={itemVariants}
        className="mt-10"
      >

        <div className="flex items-end justify-between">

          <div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              QUICK ACCESS
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              What do you want to do?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Access your learning tools quickly.
            </p>

          </div>

        </div>


        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {quickActions.map((item) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <Link
                  to={item.path}
                  className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
                >

                  {/* Hover Glow */}

                  <div
                    className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition duration-500 group-hover:opacity-20`}
                  />


                  <div className="relative">

                    <div className="flex items-start justify-between">

                      {/* Icon */}

                      <motion.div
                        whileHover={{
                          rotate: -5,
                          scale: 1.08,
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                      >

                        <Icon size={21} />

                      </motion.div>


                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-300 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">

                        <ArrowRight
                          size={17}
                          className="transition group-hover:translate-x-0.5"
                        />

                      </div>

                    </div>


                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>


                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>


                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-indigo-600 opacity-0 transition group-hover:opacity-100">

                      Open feature

                      <ArrowRight size={13} />

                    </div>

                  </div>

                </Link>

              </motion.div>
            );

          })}

        </div>

      </motion.section>


      {/* ===============================================
          Today's Plan + AI Recommendation
      =============================================== */}

      <motion.section
        variants={itemVariants}
        className="mt-10 grid gap-6 lg:grid-cols-3"
      >

        {/* Study Plan */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold tracking-wider text-indigo-600">
                TODAY'S PLAN
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Your Study Schedule
              </h2>

            </div>


            <Link
              to="/student/planner"
              className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:flex"
            >

              View Planner

              <ArrowRight size={15} />

            </Link>

          </div>


          <div className="mt-6 space-y-3">

            {studyTasks.map((task, index) => (

              <motion.div
                key={task.task}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5 + index * 0.1,
                }}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="relative">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">

                      {task.status === "Completed" ? (
                        <CheckCircle2 size={19} />
                      ) : (
                        <NotebookPen size={19} />
                      )}

                    </div>

                    {index < studyTasks.length - 1 && (
                      <div className="absolute left-1/2 top-11 hidden h-3 w-px bg-indigo-100 sm:block" />
                    )}

                  </div>


                  <div>

                    <p className="text-xs font-medium text-slate-400">
                      {task.subject}
                    </p>

                    <h3 className="mt-0.5 text-sm font-bold text-slate-800">
                      {task.task}
                    </h3>

                  </div>

                </div>


                <div className="flex items-center gap-4">

                  <div className="hidden text-right sm:block">

                    <p className="text-xs font-semibold text-slate-600">
                      {task.time}
                    </p>

                    <p className="text-[11px] text-slate-400">
                      {task.duration}
                    </p>

                  </div>


                  <StatusBadge status={task.status} />

                </div>

              </motion.div>

            ))}

          </div>


          <Link
            to="/student/planner"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50 sm:hidden"
          >

            View Full Planner

            <ArrowRight size={15} />

          </Link>

        </div>


        {/* AI Recommendation */}

        <motion.div
          whileHover={{
            y: -4,
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 shadow-sm ring-1 ring-indigo-100"
        >

          {/* Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-400 blur-3xl"
          />


          <div className="relative">

            {/* AI Icon */}

            <motion.div
              animate={{
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
            >

              <Sparkles size={22} />

            </motion.div>


            <div className="mt-6 flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              <p className="text-xs font-bold tracking-wider text-purple-600">
                AI RECOMMENDATION
              </p>

            </div>


            <h2 className="mt-3 text-xl font-black leading-7 text-slate-900">
              Improve Your JavaScript Skills
            </h2>


            <p className="mt-3 text-sm leading-6 text-slate-600">
              Based on your recent study activity, spend 20 minutes reviewing
              Promises and Async/Await.
            </p>


            {/* Recommendation Progress */}

            <div className="mt-6 rounded-2xl bg-white/80 p-4">

              <div className="flex items-center justify-between">

                <span className="text-xs font-semibold text-slate-500">
                  Recommended time
                </span>

                <span className="text-xs font-bold text-indigo-600">
                  20 min
                </span>

              </div>


              <div className="mt-3 h-2 rounded-full bg-slate-100">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{
                    duration: 1,
                    delay: 0.8,
                  }}
                  className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />

              </div>

            </div>


            <Link
              to="/student/chat"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >

              <Play size={15} />

              Start Learning

              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />

            </Link>

          </div>

        </motion.div>

      </motion.section>


      {/* Bottom Spacing */}

      <div className="h-4" />

    </motion.div>
  );
}


/* ---------------------------------------------------
   Statistics Card
--------------------------------------------------- */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
      }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <motion.p
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="mt-2 text-2xl font-black text-slate-900"
          >
            {value}
          </motion.p>

          <p className="mt-1 text-xs font-medium text-green-600">
            {subtitle}
          </p>

        </div>


        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 5,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white"
        >

          <Icon size={21} />

        </motion.div>

      </div>

    </motion.div>
  );
}


/* ---------------------------------------------------
   Status Badge
--------------------------------------------------- */

function StatusBadge({ status }) {

  const styles = {
    Completed: "bg-green-50 text-green-600",
    "In Progress": "bg-indigo-50 text-indigo-600",
    Upcoming: "bg-slate-100 text-slate-500",
  };


  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}


export default StudentDashboard;