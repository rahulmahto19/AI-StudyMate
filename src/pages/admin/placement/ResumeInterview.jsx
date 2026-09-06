import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  X,
  Brain,
  Sparkles,
  CheckCircle2,
  Clock3,
  Target,
  TrendingUp,
  Award,
  Code2,
  ChevronRight,
  AlertCircle,
  BarChart3,
  CalendarDays,
  User,
  Briefcase,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const initialSessions = [
  {
    id: "RI-1001",
    student: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    resume: "Rahul_Sharma_Resume.pdf",
    uploadedAt: "02 Sep 2026",
    status: "Completed",
    score: 86,
    totalQuestions: 15,
    answeredQuestions: 15,

    skills: [
      "React.js",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "Express.js",
    ],

    experience: "Fresher",
    interviewType: "Technical",
    difficulty: "Medium",

    strengths: [
      "React fundamentals",
      "JavaScript concepts",
      "REST API knowledge",
    ],

    weaknesses: [
      "System design",
      "Advanced MongoDB",
      "Performance optimization",
    ],

    summary:
      "The candidate demonstrated strong frontend and JavaScript fundamentals. Backend concepts were satisfactory, while advanced architecture topics need improvement.",

    questions: [
      {
        id: 1,
        question:
          "Explain the difference between useState and useReducer in React.",
        category: "React",
        difficulty: "Medium",
        status: "Answered",
      },
      {
        id: 2,
        question: "How does the Node.js event loop work?",
        category: "Node.js",
        difficulty: "Medium",
        status: "Answered",
      },
      {
        id: 3,
        question:
          "What is the difference between SQL and NoSQL databases?",
        category: "Database",
        difficulty: "Easy",
        status: "Answered",
      },
      {
        id: 4,
        question:
          "How would you optimize a slow React application?",
        category: "Performance",
        difficulty: "Hard",
        status: "Answered",
      },
      {
        id: 5,
        question:
          "Explain JWT authentication in a MERN application.",
        category: "Security",
        difficulty: "Medium",
        status: "Answered",
      },
    ],
  },

  {
    id: "RI-1002",
    student: "Priya Singh",
    email: "priya.singh@gmail.com",
    resume: "Priya_Singh_Resume.pdf",
    uploadedAt: "01 Sep 2026",
    status: "Completed",
    score: 91,
    totalQuestions: 20,
    answeredQuestions: 20,

    skills: [
      "Python",
      "Django",
      "Machine Learning",
      "SQL",
      "Pandas",
    ],

    experience: "1 Year",
    interviewType: "Technical",
    difficulty: "Hard",

    strengths: [
      "Python programming",
      "Machine learning",
      "Data analysis",
    ],

    weaknesses: [
      "Cloud deployment",
      "System architecture",
    ],

    summary:
      "Strong technical performance with excellent Python and machine learning fundamentals. The candidate should improve practical cloud and deployment knowledge.",

    questions: [
      {
        id: 1,
        question:
          "Explain the difference between supervised and unsupervised learning.",
        category: "Machine Learning",
        difficulty: "Easy",
        status: "Answered",
      },
      {
        id: 2,
        question: "What is Django middleware?",
        category: "Django",
        difficulty: "Medium",
        status: "Answered",
      },
      {
        id: 3,
        question:
          "How do you handle missing values in a dataset?",
        category: "Data Science",
        difficulty: "Medium",
        status: "Answered",
      },
    ],
  },

  {
    id: "RI-1003",
    student: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    resume: "Amit_Kumar_Resume.pdf",
    uploadedAt: "31 Aug 2026",
    status: "In Progress",
    score: 64,
    totalQuestions: 15,
    answeredQuestions: 9,

    skills: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Hibernate",
    ],

    experience: "Fresher",
    interviewType: "Technical",
    difficulty: "Medium",

    strengths: [
      "Java basics",
      "OOP concepts",
    ],

    weaknesses: [
      "Spring Boot",
      "Database optimization",
      "REST API design",
    ],

    summary:
      "The interview is currently in progress. Initial responses show good Java fundamentals but weaker practical backend implementation knowledge.",

    questions: [
      {
        id: 1,
        question:
          "Explain the four pillars of OOP.",
        category: "Java",
        difficulty: "Easy",
        status: "Answered",
      },
      {
        id: 2,
        question:
          "What is dependency injection in Spring Boot?",
        category: "Spring Boot",
        difficulty: "Medium",
        status: "Answered",
      },
      {
        id: 3,
        question:
          "Explain Hibernate lazy and eager loading.",
        category: "Hibernate",
        difficulty: "Hard",
        status: "Pending",
      },
    ],
  },

  {
    id: "RI-1004",
    student: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    resume: "Sneha_Patel_Resume.pdf",
    uploadedAt: "29 Aug 2026",
    status: "Completed",
    score: 78,
    totalQuestions: 12,
    answeredQuestions: 12,

    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "Android",
    ],

    experience: "Fresher",
    interviewType: "Mobile Development",
    difficulty: "Medium",

    strengths: [
      "Flutter widgets",
      "Firebase integration",
    ],

    weaknesses: [
      "State management",
      "Application architecture",
    ],

    summary:
      "The candidate has good practical Flutter knowledge and Firebase experience. More preparation is required for scalable application architecture.",

    questions: [
      {
        id: 1,
        question:
          "What is the difference between StatelessWidget and StatefulWidget?",
        category: "Flutter",
        difficulty: "Easy",
        status: "Answered",
      },
      {
        id: 2,
        question:
          "Explain Provider and state management in Flutter.",
        category: "Flutter",
        difficulty: "Medium",
        status: "Answered",
      },
    ],
  },

  {
    id: "RI-1005",
    student: "Vikas Verma",
    email: "vikas.verma@gmail.com",
    resume: "Vikas_Verma_Resume.pdf",
    uploadedAt: "28 Aug 2026",
    status: "Pending",
    score: 0,
    totalQuestions: 10,
    answeredQuestions: 0,

    skills: [
      "C++",
      "DSA",
      "JavaScript",
      "React",
    ],

    experience: "Fresher",
    interviewType: "Technical",
    difficulty: "Easy",

    strengths: [],
    weaknesses: [],

    summary:
      "Resume has been analyzed and interview questions have been generated. The student has not started the interview yet.",

    questions: [
      {
        id: 1,
        question:
          "What is the difference between an array and linked list?",
        category: "DSA",
        difficulty: "Easy",
        status: "Pending",
      },
      {
        id: 2,
        question:
          "What is the virtual DOM in React?",
        category: "React",
        difficulty: "Easy",
        status: "Pending",
      },
    ],
  },
];

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Icon size={21} />
        </div>

      </div>
    </motion.div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const styles = {
    Completed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    "In Progress":
      "bg-amber-50 text-amber-700 border-amber-200",

    Pending:
      "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   SCORE BADGE
========================================================= */

function ScoreBadge({ score }) {
  if (!score) {
    return (
      <span className="text-slate-400">
        —
      </span>
    );
  }

  const className =
    score >= 80
      ? "text-emerald-600"
      : score >= 60
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div
      className={`flex items-center gap-1.5 font-bold ${className}`}
    >
      <Award size={16} />
      {score}%
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function ResumeInterview() {
  const [sessions, setSessions] =
    useState(initialSessions);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedSession, setSelectedSession] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("overview");

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        session.student
          .toLowerCase()
          .includes(searchValue) ||
        session.email
          .toLowerCase()
          .includes(searchValue) ||
        session.resume
          .toLowerCase()
          .includes(searchValue) ||
        session.skills.some((skill) =>
          skill
            .toLowerCase()
            .includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "All" ||
        session.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    sessions,
    search,
    statusFilter,
  ]);

  /* =======================================================
     STATS
  ======================================================= */

  const completedSessions =
    sessions.filter(
      (item) =>
        item.status === "Completed"
    );

  const totalQuestions =
    sessions.reduce(
      (sum, item) =>
        sum + item.totalQuestions,
      0
    );

  const averageScore =
    completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) /
            completedSessions.length
        )
      : 0;

  const inProgress =
    sessions.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteSession = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this resume interview session?"
      );

    if (!confirmed) return;

    setSessions((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    setSelectedSession(null);
  };

  /* =======================================================
     REGENERATE
  ======================================================= */

  const regenerateQuestions = (
    session
  ) => {
    window.alert(
      `AI question regeneration started for ${session.student}.`
    );
  };

  /* =======================================================
     OPEN DETAILS
  ======================================================= */

  const openDetails = (
    session,
    tab = "overview"
  ) => {
    setSelectedSession(session);
    setActiveTab(tab);
  };

  return (
    <div className="w-full">

      {/* ===================================================
         PAGE HEADER
      =================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >

        {/* LEFT SIDE */}

        <div className="flex items-center gap-4">

          {/* ICON */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Sparkles
              size={27}
              strokeWidth={2}
            />
          </div>

          {/* TITLE */}

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Resume-Based Interview
            </h1>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage AI-generated interview sessions created from
              student resumes. Review extracted skills, personalized
              questions, interview scores and AI performance analysis.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">

          <div className="rounded-xl bg-white p-2.5 text-indigo-600 shadow-sm">
            <Brain size={21} />
          </div>

          <div>

            <p className="text-xs font-medium text-indigo-500">
              AI Interview Pipeline
            </p>

            <p className="text-sm font-bold text-indigo-700">
              Resume → Questions → Analysis
            </p>

          </div>

        </div>

      </motion.div>

      {/* ===================================================
         STATS
      =================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Sessions"
          value={sessions.length}
          subtitle="Resume interviews"
          icon={FileText}
        />

        <StatCard
          title="Completed"
          value={completedSessions.length}
          subtitle="Finished interviews"
          icon={CheckCircle2}
        />

        <StatCard
          title="Questions Generated"
          value={totalQuestions}
          subtitle="AI-generated questions"
          icon={Brain}
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          subtitle="Completed interviews"
          icon={Target}
        />

        <StatCard
          title="In Progress"
          value={inProgress}
          subtitle="Active interviews"
          icon={Clock3}
        />

      </div>

      {/* ===================================================
         TABLE CARD
      =================================================== */}

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
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        {/* =================================================
           TOOLBAR
        ================================================= */}

        <div className="border-b border-slate-200 p-4 sm:p-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Resume Interview Sessions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review and manage student resume-based interview activity.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search student, resume, skill..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-80"
                />

              </div>

              {/* FILTER */}

              <div className="relative">

                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-44"
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
           DESKTOP TABLE
        ================================================= */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200 text-left">

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Resume
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Skills
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Questions
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Score
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              <AnimatePresence>

                {filteredSessions.map(
                  (session) => (

                    <motion.tr
                      key={session.id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      {/* STUDENT */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                            {session.student.charAt(
                              0
                            )}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {session.student}
                            </p>

                            <p className="text-xs text-slate-500">
                              {session.email}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                              {session.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* RESUME */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <div className="rounded-lg bg-red-50 p-2 text-red-500">
                            <FileText size={17} />
                          </div>

                          <div>

                            <p className="max-w-[180px] truncate text-sm font-medium text-slate-700">
                              {session.resume}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                              <CalendarDays size={12} />
                              {session.uploadedAt}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* SKILLS */}

                      <td className="px-5 py-4">

                        <div className="flex max-w-[230px] flex-wrap gap-1.5">

                          {session.skills
                            .slice(0, 3)
                            .map(
                              (skill) => (

                                <span
                                  key={skill}
                                  className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-600"
                                >
                                  {skill}
                                </span>

                              )
                            )}

                          {session.skills.length >
                            3 && (

                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                              +
                              {session.skills.length -
                                3}
                            </span>

                          )}

                        </div>

                      </td>

                      {/* QUESTIONS */}

                      <td className="px-5 py-4">

                        <p className="font-semibold text-slate-800">
                          {
                            session.totalQuestions
                          }
                        </p>

                        <p className="text-xs text-slate-400">
                          {
                            session.answeredQuestions
                          }{" "}
                          answered
                        </p>

                      </td>

                      {/* SCORE */}

                      <td className="px-5 py-4">

                        <ScoreBadge
                          score={
                            session.score
                          }
                        />

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={
                            session.status
                          }
                        />

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-1">

                          <button
                            onClick={() =>
                              openDetails(
                                session,
                                "overview"
                              )
                            }
                            title="View Analysis"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() =>
                              regenerateQuestions(
                                session
                              )
                            }
                            title="Regenerate Questions"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                          >
                            <RefreshCw
                              size={17}
                            />
                          </button>

                          <button
                            onClick={() =>
                              deleteSession(
                                session.id
                              )
                            }
                            title="Delete"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </motion.tr>

                  )
                )}

              </AnimatePresence>

            </tbody>

          </table>

        </div>

        {/* =================================================
           MOBILE CARDS
        ================================================= */}

        <div className="space-y-3 p-4 lg:hidden">

          {filteredSessions.map(
            (session) => (

              <motion.div
                key={session.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                      {session.student.charAt(
                        0
                      )}
                    </div>

                    <div>

                      <p className="font-semibold text-slate-800">
                        {session.student}
                      </p>

                      <p className="text-xs text-slate-500">
                        {session.email}
                      </p>

                    </div>

                  </div>

                  <StatusBadge
                    status={
                      session.status
                    }
                  />

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Questions
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {
                        session.totalQuestions
                      }
                    </p>

                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Score
                    </p>

                    <p className="mt-1">
                      <ScoreBadge
                        score={
                          session.score
                        }
                      />
                    </p>

                  </div>

                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">

                  {session.skills
                    .slice(0, 4)
                    .map((skill) => (

                      <span
                        key={skill}
                        className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-600"
                      >
                        {skill}
                      </span>

                    ))}

                </div>

                <button
                  onClick={() =>
                    openDetails(
                      session,
                      "overview"
                    )
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  View Analysis
                  <ChevronRight size={16} />
                </button>

              </motion.div>

            )
          )}

        </div>

        {/* EMPTY */}

        {filteredSessions.length === 0 && (

          <div className="py-16 text-center">

            <Search
              className="mx-auto text-slate-300"
              size={40}
            />

            <p className="mt-3 font-medium text-slate-600">
              No interview sessions found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filter.
            </p>

          </div>

        )}

      </motion.div>

      {/* =====================================================
         DETAIL MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedSession && (

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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={() =>
              setSelectedSession(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >

              {/* MODAL HEADER */}

              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600">
                    <Brain size={21} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Resume Interview Analysis
                    </h2>

                    <p className="text-xs text-slate-500">
                      {selectedSession.id} ·{" "}
                      {selectedSession.student}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedSession(null)
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

              </div>

              {/* TABS */}

              <div className="flex shrink-0 overflow-x-auto border-b border-slate-200 px-5">

                {[
                  ["overview", "Overview"],
                  [
                    "resume",
                    "Resume Analysis",
                  ],
                  [
                    "questions",
                    "Generated Questions",
                  ],
                  [
                    "performance",
                    "Performance",
                  ],
                ].map(
                  ([id, label]) => (

                    <button
                      key={id}
                      onClick={() =>
                        setActiveTab(id)
                      }
                      className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                        activeTab === id
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {label}
                    </button>

                  )
                )}

              </div>

              {/* CONTENT */}

              <div className="min-h-0 flex-1 overflow-y-auto p-5">

                {/* =================================================
                   OVERVIEW
                ================================================= */}

                {activeTab ===
                  "overview" && (

                  <div className="space-y-5">

                    {/* TOP DETAILS */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                      <div className="rounded-xl bg-slate-50 p-4">

                        <div className="flex items-center gap-2 text-slate-400">

                          <User size={15} />

                          <p className="text-xs">
                            Candidate
                          </p>

                        </div>

                        <p className="mt-2 font-semibold text-slate-800">
                          {
                            selectedSession.student
                          }
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">

                        <div className="flex items-center gap-2 text-slate-400">

                          <Briefcase
                            size={15}
                          />

                          <p className="text-xs">
                            Interview Type
                          </p>

                        </div>

                        <p className="mt-2 font-semibold text-slate-800">
                          {
                            selectedSession.interviewType
                          }
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                          Difficulty
                        </p>

                        <p className="mt-2 font-semibold text-slate-800">
                          {
                            selectedSession.difficulty
                          }
                        </p>

                      </div>

                      <div className="rounded-xl bg-indigo-50 p-4">

                        <p className="text-xs text-indigo-500">
                          Interview Score
                        </p>

                        <p className="mt-2 text-2xl font-bold text-indigo-700">

                          {selectedSession.score
                            ? `${selectedSession.score}%`
                            : "Not Started"}

                        </p>

                      </div>

                    </div>

                    {/* STRENGTHS / WEAKNESSES */}

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                      {/* STRENGTHS */}

                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">

                        <div className="flex items-center gap-2">

                          <TrendingUp
                            size={18}
                            className="text-emerald-600"
                          />

                          <h3 className="font-semibold text-slate-800">
                            AI Identified Strengths
                          </h3>

                        </div>

                        {selectedSession
                          .strengths
                          .length > 0 ? (

                          <div className="mt-4 space-y-2">

                            {selectedSession.strengths.map(
                              (item) => (

                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-sm text-slate-700"
                                >

                                  <CheckCircle2
                                    size={16}
                                    className="text-emerald-500"
                                  />

                                  {item}

                                </div>

                              )
                            )}

                          </div>

                        ) : (

                          <p className="mt-4 text-sm text-slate-500">
                            Analysis will be available after the interview.
                          </p>

                        )}

                      </div>

                      {/* WEAKNESSES */}

                      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5">

                        <div className="flex items-center gap-2">

                          <AlertCircle
                            size={18}
                            className="text-amber-600"
                          />

                          <h3 className="font-semibold text-slate-800">
                            Areas to Improve
                          </h3>

                        </div>

                        {selectedSession
                          .weaknesses
                          .length > 0 ? (

                          <div className="mt-4 space-y-2">

                            {selectedSession.weaknesses.map(
                              (item) => (

                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-sm text-slate-700"
                                >

                                  <ChevronRight
                                    size={16}
                                    className="text-amber-500"
                                  />

                                  {item}

                                </div>

                              )
                            )}

                          </div>

                        ) : (

                          <p className="mt-4 text-sm text-slate-500">
                            Analysis will be available after the interview.
                          </p>

                        )}

                      </div>

                    </div>

                    {/* AI SUMMARY */}

                    <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-5">

                      <div className="flex items-center gap-2">

                        <Sparkles
                          size={18}
                          className="text-indigo-600"
                        />

                        <h3 className="font-semibold text-slate-800">
                          AI Interview Summary
                        </h3>

                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {
                          selectedSession.summary
                        }
                      </p>

                    </div>

                  </div>
                )}

                {/* =================================================
                   RESUME ANALYSIS
                ================================================= */}

                {activeTab ===
                  "resume" && (

                  <div className="space-y-5">

                    {/* RESUME */}

                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-red-100 p-3 text-red-600">
                          <FileText size={24} />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {
                              selectedSession.resume
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            Uploaded{" "}
                            {
                              selectedSession.uploadedAt
                            }
                          </p>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          window.alert(
                            "Resume preview will be connected to your backend later."
                          )
                        }
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                      >
                        View Resume
                      </button>

                    </div>

                    {/* SKILLS */}

                    <div>

                      <div className="mb-3 flex items-center gap-2">

                        <Code2
                          size={18}
                          className="text-indigo-600"
                        />

                        <h3 className="font-semibold text-slate-800">
                          Skills Extracted by AI
                        </h3>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {selectedSession.skills.map(
                          (skill) => (

                            <span
                              key={skill}
                              className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                            >
                              {skill}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    {/* EXPERIENCE / DIFFICULTY */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <div className="rounded-xl border border-slate-200 p-4">

                        <p className="text-xs text-slate-500">
                          Experience Level
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {
                            selectedSession.experience
                          }
                        </p>

                      </div>

                      <div className="rounded-xl border border-slate-200 p-4">

                        <p className="text-xs text-slate-500">
                          AI Interview Difficulty
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {
                            selectedSession.difficulty
                          }
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                   GENERATED QUESTIONS
                ================================================= */}

                {activeTab ===
                  "questions" && (

                  <div className="space-y-3">

                    {selectedSession.questions.map(
                      (item, index) => (

                        <motion.div
                          key={item.id}
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.04,
                          }}
                          className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30"
                        >

                          <div className="flex gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600">
                              {index + 1}
                            </div>

                            <div className="min-w-0 flex-1">

                              <p className="text-sm font-semibold leading-6 text-slate-800">
                                {
                                  item.question
                                }
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2">

                                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                                  {
                                    item.category
                                  }
                                </span>

                                <span className="rounded-md bg-purple-50 px-2 py-1 text-[11px] font-medium text-purple-600">
                                  {
                                    item.difficulty
                                  }
                                </span>

                                <span
                                  className={`rounded-md px-2 py-1 text-[11px] font-medium ${
                                    item.status ===
                                    "Answered"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {
                                    item.status
                                  }
                                </span>

                              </div>

                            </div>

                          </div>

                        </motion.div>

                      )
                    )}

                  </div>
                )}

                {/* =================================================
                   PERFORMANCE
                ================================================= */}

                {activeTab ===
                  "performance" && (

                  <div className="space-y-5">

                    {selectedSession.score >
                    0 ? (

                      <>

                        {/* SCORE */}

                        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">

                          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                              <p className="text-sm text-indigo-100">
                                Overall Interview Performance
                              </p>

                              <p className="mt-2 text-5xl font-bold">
                                {
                                  selectedSession.score
                                }
                                %
                              </p>

                              <p className="mt-2 text-sm text-indigo-100">
                                Based on AI evaluation of interview responses
                              </p>

                            </div>

                            <div className="rounded-2xl bg-white/10 p-5">

                              <BarChart3
                                size={42}
                              />

                            </div>

                          </div>

                        </div>

                        {/* METRICS */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                          <div className="rounded-xl border border-slate-200 p-5">

                            <p className="text-xs text-slate-500">
                              Questions
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-800">
                              {
                                selectedSession.totalQuestions
                              }
                            </p>

                          </div>

                          <div className="rounded-xl border border-slate-200 p-5">

                            <p className="text-xs text-slate-500">
                              Answered
                            </p>

                            <p className="mt-1 text-2xl font-bold text-emerald-600">
                              {
                                selectedSession.answeredQuestions
                              }
                            </p>

                          </div>

                          <div className="rounded-xl border border-slate-200 p-5">

                            <p className="text-xs text-slate-500">
                              Completion
                            </p>

                            <p className="mt-1 text-2xl font-bold text-indigo-600">

                              {Math.round(
                                (selectedSession.answeredQuestions /
                                  selectedSession.totalQuestions) *
                                  100
                              )}
                              %

                            </p>

                          </div>

                        </div>

                        {/* ASSESSMENT */}

                        <div className="rounded-xl border border-slate-200 p-5">

                          <h3 className="font-semibold text-slate-800">
                            AI Performance Assessment
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {
                              selectedSession.summary
                            }
                          </p>

                        </div>

                      </>

                    ) : (

                      <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">

                        <Clock3
                          size={38}
                          className="mx-auto text-slate-300"
                        />

                        <h3 className="mt-3 font-semibold text-slate-700">
                          Interview Not Started
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          Performance analysis will appear after the student completes the interview.
                        </p>

                      </div>

                    )}

                  </div>
                )}

              </div>

              {/* =================================================
                 FOOTER
              ================================================= */}

              <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <button
                  onClick={() =>
                    regenerateQuestions(
                      selectedSession
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  <RefreshCw size={16} />
                  Regenerate Questions
                </button>

                <button
                  onClick={() =>
                    setSelectedSession(null)
                  }
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Close
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}