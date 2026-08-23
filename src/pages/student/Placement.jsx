import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  Target,
  Brain,
  Code2,
  FileText,
  UserRound,
  Trophy,
  Clock,
  CheckCircle2,
  ArrowRight,
  Play,
  Upload,
  Sparkles,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Search,
  BookOpen,
  Users,
  Award,
  BarChart3,
  X,
  RotateCcw,
} from "lucide-react";

/* =====================================================
   SAMPLE DATA
===================================================== */

const aptitudeTopics = [
  {
    title: "Quantitative Aptitude",
    description:
      "Percentages, profit & loss, ratios, averages, time and work.",
    questions: 120,
    completed: 72,
    icon: Target,
  },

  {
    title: "Logical Reasoning",
    description:
      "Series, puzzles, coding-decoding, blood relations and logic.",
    questions: 100,
    completed: 54,
    icon: Brain,
  },

  {
    title: "Verbal Ability",
    description:
      "Grammar, vocabulary, comprehension and sentence correction.",
    questions: 80,
    completed: 41,
    icon: BookOpen,
  },
];

const technicalTopics = [
  {
    title: "JavaScript",
    description:
      "ES6, promises, async/await, closures, arrays and objects.",
    questions: 100,
    completed: 68,
    icon: Code2,
  },

  {
    title: "React",
    description:
      "Hooks, components, props, state, routing and optimization.",
    questions: 80,
    completed: 52,
    icon: Code2,
  },

  {
    title: "Node.js & Express",
    description:
      "REST APIs, middleware, authentication and backend concepts.",
    questions: 75,
    completed: 38,
    icon: Code2,
  },

  {
    title: "MongoDB",
    description:
      "Queries, aggregation, indexes, schemas and Mongoose.",
    questions: 70,
    completed: 42,
    icon: Code2,
  },

  {
    title: "SQL",
    description:
      "Joins, subqueries, grouping, normalization and queries.",
    questions: 90,
    completed: 61,
    icon: Code2,
  },

  {
    title: "DSA",
    description:
      "Arrays, strings, searching, sorting, recursion and algorithms.",
    questions: 120,
    completed: 48,
    icon: Brain,
  },
];

const interviewTypes = [
  {
    title: "Technical Interview",
    description:
      "Practice questions related to your technical skills and projects.",
    icon: Code2,
    color: "indigo",
  },

  {
    title: "HR Interview",
    description:
      "Practice common HR questions and professional responses.",
    icon: Users,
    color: "purple",
  },

  {
    title: "Behavioral Interview",
    description:
      "Prepare answers for teamwork, leadership and problem-solving.",
    icon: UserRound,
    color: "blue",
  },

  {
    title: "AI Mock Interview",
    description:
      "Practice a complete interview with your AI StudyMate assistant.",
    icon: Sparkles,
    color: "violet",
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function Placement() {
  const [activeTab, setActiveTab] =
    useState("overview");

  const [search, setSearch] =
    useState("");

  const [showResumeModal, setShowResumeModal] =
    useState(false);

  const [showTestModal, setShowTestModal] =
    useState(false);

  const [selectedTest, setSelectedTest] =
    useState(null);

  const [resumeName, setResumeName] =
    useState("");

  const [resumeUploaded, setResumeUploaded] =
    useState(false);

  /* =====================================================
     STATS
  ===================================================== */

  const totalQuestions =
    aptitudeTopics.reduce(
      (total, topic) =>
        total + topic.questions,
      0
    ) +
    technicalTopics.reduce(
      (total, topic) =>
        total + topic.questions,
      0
    );

  const completedQuestions =
    aptitudeTopics.reduce(
      (total, topic) =>
        total + topic.completed,
      0
    ) +
    technicalTopics.reduce(
      (total, topic) =>
        total + topic.completed,
      0
    );

  const overallProgress =
    Math.round(
      (completedQuestions /
        totalQuestions) *
        100
    );

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredTechnicalTopics =
    useMemo(() => {
      return technicalTopics.filter(
        (topic) =>
          topic.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search]);

  /* =====================================================
     RESUME UPLOAD
  ===================================================== */

  const handleResumeUpload = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setResumeName(file.name);
    setResumeUploaded(true);
  };

  /* =====================================================
     OPEN TEST
  ===================================================== */

  const startTest = (test) => {
    setSelectedTest(test);
    setShowTestModal(true);
  };

  /* =====================================================
     TABS
  ===================================================== */

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
    },

    {
      id: "aptitude",
      label: "Aptitude",
      icon: Target,
    },

    {
      id: "technical",
      label: "Technical",
      icon: Code2,
    },

    {
      id: "interview",
      label: "Interview",
      icon: Users,
    },

    {
      id: "resume",
      label: "Resume",
      icon: FileText,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
      >

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">

              <BriefcaseBusiness
                size={19}
              />

            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              CAREER & PLACEMENT
            </p>

          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Placement Preparation
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Prepare for aptitude tests, technical interviews,
            HR rounds, and resume-based interviews with AI-powered
            practice.
          </p>

        </div>

        {/* Resume Button */}

        <button
          onClick={() =>
            setShowResumeModal(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >

          <Upload size={17} />

          Upload Resume

        </button>

      </motion.div>

      {/* =================================================
          PROGRESS CARD
      ================================================= */}

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
          delay: 0.1,
        }}
        className="mt-7 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl shadow-indigo-100"
      >

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Progress */}

          <div className="lg:col-span-2">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-indigo-100">
                  Overall Placement Progress
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  {overallProgress}%
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">

                <TrendingUp
                  size={22}
                />

              </div>

            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/20">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${overallProgress}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full rounded-full bg-white"
              />

            </div>

            <p className="mt-3 text-xs text-indigo-100">
              {completedQuestions} of{" "}
              {totalQuestions} practice
              questions completed.
            </p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-3">

            <PlacementStat
              value="76%"
              label="Accuracy"
            />

            <PlacementStat
              value="8"
              label="Mock Tests"
            />

            <PlacementStat
              value="24"
              label="Interviews"
            />

          </div>

        </div>

      </motion.div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

        <div className="flex min-w-max gap-1">

          {tabs.map(
            (tab) => {

              const Icon =
                tab.icon;

              const active =
                activeTab ===
                tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >

                  <Icon size={15} />

                  {tab.label}

                </button>
              );
            }
          )}

        </div>

      </div>

      {/* =================================================
          TAB CONTENT
      ================================================= */}

      <AnimatePresence mode="wait">

        {activeTab ===
          "overview" && (

          <motion.div
            key="overview"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="mt-7 space-y-6"
          >

            <OverviewSection
              onStartTest={startTest}
              onTabChange={
                setActiveTab
              }
              resumeUploaded={
                resumeUploaded
              }
              resumeName={
                resumeName
              }
            />

          </motion.div>
        )}

        {activeTab ===
          "aptitude" && (

          <motion.div
            key="aptitude"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="mt-7"
          >

            <AptitudeSection
              onStartTest={
                startTest
              }
            />

          </motion.div>
        )}

        {activeTab ===
          "technical" && (

          <motion.div
            key="technical"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="mt-7"
          >

            <TechnicalSection
              search={search}
              setSearch={
                setSearch
              }
              topics={
                filteredTechnicalTopics
              }
            />

          </motion.div>
        )}

        {activeTab ===
          "interview" && (

          <motion.div
            key="interview"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="mt-7"
          >

            <InterviewSection
              onStartInterview={
                startTest
              }
            />

          </motion.div>
        )}

        {activeTab ===
          "resume" && (

          <motion.div
            key="resume"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="mt-7"
          >

            <ResumeSection
              uploaded={
                resumeUploaded
              }
              resumeName={
                resumeName
              }
              onUpload={() =>
                setShowResumeModal(
                  true
                )
              }
            />

          </motion.div>
        )}

      </AnimatePresence>

      {/* =================================================
          RESUME MODAL
      ================================================= */}

      <AnimatePresence>

        {showResumeModal && (

          <ResumeModal
            onClose={() =>
              setShowResumeModal(
                false
              )
            }
            onUpload={
              handleResumeUpload
            }
            uploaded={
              resumeUploaded
            }
            resumeName={
              resumeName
            }
          />

        )}

      </AnimatePresence>

      {/* =================================================
          TEST MODAL
      ================================================= */}

      <AnimatePresence>

        {showTestModal && (

          <TestModal
            test={selectedTest}
            onClose={() =>
              setShowTestModal(
                false
              )
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}

/* =====================================================
   PLACEMENT STAT
===================================================== */

function PlacementStat({
  value,
  label,
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">

      <p className="text-xl font-black">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-indigo-100">
        {label}
      </p>

    </div>
  );
}

/* =====================================================
   OVERVIEW
===================================================== */

function OverviewSection({
  onStartTest,
  onTabChange,
  resumeUploaded,
  resumeName,
}) {
  return (
    <>
      {/* Quick Actions */}

      <div>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Your Preparation
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Continue Learning
            </h2>

          </div>

          <Trophy
            size={22}
            className="text-indigo-500"
          />

        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickAction
            icon={Target}
            title="Aptitude"
            description="Practice aptitude questions"
            onClick={() =>
              onTabChange(
                "aptitude"
              )
            }
          />

          <QuickAction
            icon={Code2}
            title="Technical"
            description="Improve technical skills"
            onClick={() =>
              onTabChange(
                "technical"
              )
            }
          />

          <QuickAction
            icon={Users}
            title="Interview"
            description="Practice interviews"
            onClick={() =>
              onTabChange(
                "interview"
              )
            }
          />

          <QuickAction
            icon={FileText}
            title="Resume"
            description={
              resumeUploaded
                ? "Resume uploaded"
                : "Upload your resume"
            }
            onClick={() =>
              onTabChange(
                "resume"
              )
            }
          />

        </div>

      </div>

      {/* Mock Tests */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Practice
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Mock Tests
            </h2>

          </div>

          <button
            onClick={() =>
              onStartTest({
                title: "Full Placement Mock Test",
                questions: 30,
                duration: 30,
              })
            }
            className="hidden items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white sm:flex"
          >

            View Test

            <ArrowRight
              size={14}
            />

          </button>

        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <MockTestCard
            title="Aptitude Test"
            description="Quantitative + Logical + Verbal"
            questions="20 Questions"
            duration="20 min"
            onStart={() =>
              onStartTest({
                title: "Aptitude Test",
                questions: 20,
                duration: 20,
              })
            }
          />

          <MockTestCard
            title="Technical Test"
            description="JavaScript + React + Node.js"
            questions="25 Questions"
            duration="25 min"
            onStart={() =>
              onStartTest({
                title: "Technical Test",
                questions: 25,
                duration: 25,
              })
            }
          />

          <MockTestCard
            title="Full Placement Test"
            description="Complete placement preparation"
            questions="30 Questions"
            duration="30 min"
            onStart={() =>
              onStartTest({
                title: "Full Placement Mock Test",
                questions: 30,
                duration: 30,
              })
            }
          />

        </div>

      </section>

      {/* Resume */}

      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">

              <FileText size={22} />

            </div>

            <div>

              <h3 className="font-black text-slate-900">
                Resume-Based Interview
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {resumeUploaded
                  ? resumeName
                  : "Upload your resume to generate personalized interview questions."}
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              onTabChange(
                "resume"
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700"
          >

            {resumeUploaded
              ? "Analyze Resume"
              : "Upload Resume"}

            <ArrowRight
              size={14}
            />

          </button>

        </div>

      </section>
    </>
  );
}

/* =====================================================
   QUICK ACTION
===================================================== */

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        y: -3,
      }}
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">

          <Icon size={20} />

        </div>

        <ChevronRight
          size={16}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
        />

      </div>

      <h3 className="mt-4 text-sm font-black text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </motion.button>
  );
}

/* =====================================================
   MOCK TEST CARD
===================================================== */

function MockTestCard({
  title,
  description,
  questions,
  duration,
  onStart,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-indigo-100 hover:bg-indigo-50/40"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">

          <Target size={18} />

        </div>

        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold text-indigo-600">
          Practice
        </span>

      </div>

      <h3 className="mt-4 text-sm font-black text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-4">

        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <BookOpen size={12} />
          {questions}
        </span>

        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <Clock size={12} />
          {duration}
        </span>

      </div>

      <button
        onClick={onStart}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
      >

        <Play
          size={13}
          fill="currentColor"
        />

        Start Test

      </button>

    </motion.div>
  );
}

/* =====================================================
   APTITUDE SECTION
===================================================== */

function AptitudeSection({
  onStartTest,
}) {
  return (
    <div className="space-y-6">

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Aptitude Preparation
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Build Your Aptitude Skills
            </h2>

            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Practice quantitative aptitude, logical reasoning,
              and verbal ability questions commonly asked in placement tests.
            </p>

          </div>

          <button
            onClick={() =>
              onStartTest({
                title: "Aptitude Mock Test",
                questions: 20,
                duration: 20,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700"
          >

            <Play
              size={14}
              fill="currentColor"
            />

            Take Mock Test

          </button>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        {aptitudeTopics.map(
          (topic) => (
            <PracticeTopic
              key={topic.title}
              topic={topic}
            />
          )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   TECHNICAL SECTION
===================================================== */

function TechnicalSection({
  search,
  setSearch,
  topics,
}) {
  return (
    <div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Technical Preparation
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Technical Skills
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Prepare for technical interviews with topic-wise practice.
            </p>

          </div>

          <div className="relative sm:w-64">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search topic..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {topics.map(
          (topic) => (
            <PracticeTopic
              key={topic.title}
              topic={topic}
            />
          )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   PRACTICE TOPIC
===================================================== */

function PracticeTopic({
  topic,
}) {
  const Icon = topic.icon;

  const progress = Math.round(
    (topic.completed /
      topic.questions) *
      100
  );

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Icon size={20} />

        </div>

        <span className="text-xs font-black text-indigo-600">
          {progress}%
        </span>

      </div>

      <h3 className="mt-5 text-base font-black text-slate-900">
        {topic.title}
      </h3>

      <p className="mt-2 min-h-[48px] text-xs leading-5 text-slate-400">
        {topic.description}
      </p>

      <div className="mt-5">

        <div className="flex justify-between text-[10px] font-semibold text-slate-400">

          <span>
            {topic.completed} completed
          </span>

          <span>
            {topic.questions} questions
          </span>

        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
          />

        </div>

      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-indigo-600 hover:text-white">

        Practice Now

        <ArrowRight
          size={13}
        />

      </button>

    </motion.div>
  );
}

/* =====================================================
   INTERVIEW SECTION
===================================================== */

function InterviewSection({
  onStartInterview,
}) {
  return (
    <div className="space-y-6">

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-xl shadow-indigo-100">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles
                size={18}
              />

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">
                AI Interview Practice
              </span>

            </div>

            <h2 className="mt-3 text-2xl font-black">
              Practice Before the Real Interview
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
              Practice technical, HR, and behavioral questions.
              AI can evaluate your answers and provide personalized feedback.
            </p>

          </div>

          <button
            onClick={() =>
              onStartInterview({
                title: "AI Mock Interview",
                questions: 10,
                duration: 15,
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-indigo-600 shadow-lg transition hover:-translate-y-0.5"
          >

            <Play
              size={14}
              fill="currentColor"
            />

            Start AI Interview

          </button>

        </div>

      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {interviewTypes.map(
          (interview) => {

            const Icon =
              interview.icon;

            return (
              <motion.div
                key={interview.title}
                whileHover={{
                  y: -3,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                    <Icon size={22} />

                  </div>

                  {interview.title ===
                    "AI Mock Interview" && (
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[9px] font-bold text-purple-600">
                      AI Powered
                    </span>
                  )}

                </div>

                <h3 className="mt-5 text-lg font-black text-slate-900">
                  {interview.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {interview.description}
                </p>

                <button
                  onClick={() =>
                    onStartInterview(
                      {
                        title:
                          interview.title,
                        questions: 10,
                        duration: 15,
                      }
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 py-3 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                >

                  Start Practice

                  <ArrowRight
                    size={14}
                  />

                </button>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}

/* =====================================================
   RESUME SECTION
===================================================== */

function ResumeSection({
  uploaded,
  resumeName,
  onUpload,
}) {
  return (
    <div className="space-y-6">

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col items-center justify-center py-10 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

            <FileText size={28} />

          </div>

          <h2 className="mt-5 text-2xl font-black text-slate-900">
            Resume-Based Interview Preparation
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Upload your resume and AI StudyMate can later
            generate personalized interview questions based
            on your skills, projects, education, and experience.
          </p>

          {!uploaded ? (

            <button
              onClick={onUpload}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100"
            >

              <Upload
                size={17}
              />

              Upload Resume

            </button>

          ) : (

            <div className="mt-6 w-full max-w-md rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={22}
                  className="text-emerald-500"
                />

                <div className="text-left">

                  <p className="text-sm font-bold text-slate-800">
                    Resume Uploaded
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {resumeName}
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* Resume Features */}

      <div className="grid gap-5 md:grid-cols-3">

        <ResumeFeature
          icon={FileText}
          title="Resume Analysis"
          description="Analyze skills, projects, education and experience."
        />

        <ResumeFeature
          icon={Sparkles}
          title="AI Questions"
          description="Generate interview questions from your resume."
        />

        <ResumeFeature
          icon={TrendingUp}
          title="Resume Improvement"
          description="Get suggestions to improve your resume."
        />

      </div>

    </div>
  );
}

/* =====================================================
   RESUME FEATURE
===================================================== */

function ResumeFeature({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

        <Icon size={20} />

      </div>

      <h3 className="mt-4 text-sm font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </motion.div>
  );
}

/* =====================================================
   RESUME MODAL
===================================================== */

function ResumeModal({
  onClose,
  onUpload,
  uploaded,
  resumeName,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              Upload Resume
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              PDF or DOC/DOCX format
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>

        </div>

        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">

            <Upload
              size={24}
            />

          </div>

          <p className="mt-4 text-sm font-bold text-slate-700">
            Choose your resume
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Click here to select a file
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={
              onUpload
            }
            className="hidden"
          />

        </label>

        {uploaded && (

          <div className="mt-4 rounded-xl bg-emerald-50 p-4">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={20}
                className="text-emerald-500"
              />

              <div>

                <p className="text-xs font-bold text-slate-800">
                  Resume uploaded
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {resumeName}
                </p>

              </div>

            </div>

          </div>

        )}

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Continue
        </button>

      </motion.div>

    </motion.div>
  );
}

/* =====================================================
   TEST MODAL
===================================================== */

function TestModal({
  test,
  onClose,
}) {
  if (!test) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <Target
                size={20}
              />

            </div>

            <div>

              <h2 className="font-black text-slate-900">
                {test.title}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Mock Test
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-slate-50 p-4 text-center">

            <BookOpen
              size={18}
              className="mx-auto text-indigo-600"
            />

            <p className="mt-2 text-lg font-black text-slate-900">
              {test.questions}
            </p>

            <p className="text-[10px] text-slate-400">
              Questions
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">

            <Clock
              size={18}
              className="mx-auto text-indigo-600"
            />

            <p className="mt-2 text-lg font-black text-slate-900">
              {test.duration}
            </p>

            <p className="text-[10px] text-slate-400">
              Minutes
            </p>

          </div>

        </div>

        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">

          <div className="flex gap-3">

            <AlertCircle
              size={18}
              className="shrink-0 text-amber-500"
            />

            <p className="text-xs leading-5 text-amber-700">
              The actual question engine, timer,
              scoring, and result system will be connected
              to your backend later.
            </p>

          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100"
        >

          <Play
            size={15}
            fill="currentColor"
          />

          Start Test

        </button>

      </motion.div>

    </motion.div>
  );
}

export default Placement;