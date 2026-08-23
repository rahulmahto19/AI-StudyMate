import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32"
    >

      {/* Background blobs */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">

            <Sparkles size={16} />

            AI-powered learning assistant

          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">

            Your{" "}

            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}

            Study Companion

          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Study smarter, stay organized, and prepare for your future with
            one intelligent learning platform.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1"
            >
              Start Learning

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              Explore Features
            </a>

          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-green-500"
              />
              AI Assistance
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-green-500"
              />
              Smart Planning
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-green-500"
              />
              Placement Prep
            </div>

          </div>

        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-xl"
        >

          {/* Main Dashboard */}
          <div className="relative rounded-3xl border border-white/80 bg-white/80 p-5 shadow-2xl shadow-indigo-200/50 backdrop-blur-xl">

            {/* Dashboard Header */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Good morning 👋
                </p>

                <h3 className="text-xl font-bold text-slate-900">
                  Student Workspace
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Brain size={21} />
              </div>

            </div>

            {/* AI Assistant */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="mb-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle />
                </div>

                <div>
                  <p className="text-sm text-indigo-100">
                    AI Assistant
                  </p>

                  <p className="font-semibold">
                    Ask anything about your studies.
                  </p>
                </div>

              </div>

            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Progress */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Study Progress
                  </span>

                  <Target
                    size={18}
                    className="text-indigo-600"
                  />
                </div>

                <p className="mt-3 text-3xl font-black text-slate-900">
                  78%
                </p>

                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>

              </div>

              {/* Study Plan */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

                <div className="flex items-center gap-2">

                  <BookOpen
                    size={18}
                    className="text-indigo-600"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    Today's Plan
                  </span>

                </div>

                <div className="mt-3 space-y-2 text-xs">

                  <p className="text-green-600">
                    ✓ Mathematics
                  </p>

                  <p className="text-indigo-600">
                    ● React.js
                  </p>

                  <p className="text-slate-500">
                    ○ Aptitude
                  </p>

                </div>

              </div>

            </div>

            {/* Recommendation */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 p-4"
            >

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-purple-600">
                    AI Recommendation
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    Review JavaScript Promises for 20 minutes.
                  </p>
                </div>

              </div>

            </motion.div>

          </div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute -left-5 top-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xl"
          >
            <BookOpen />
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
            }}
            className="absolute -right-5 bottom-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-xl"
          >
            <Sparkles />
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;