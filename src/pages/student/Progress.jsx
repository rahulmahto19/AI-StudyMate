import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Clock3,
  BookOpen,
  FileText,
  MessageCircle,
  Mic,
  BriefcaseBusiness,
  CheckCircle2,
  Flame,
  Trophy,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Brain,
  AlertTriangle,
  ChevronRight,
  BarChart3,
  Activity,
  Star,
  Zap,
} from "lucide-react";

/* =====================================================
   DEMO DATA
===================================================== */

const weeklyStudyData = [
  {
    day: "Mon",
    hours: 2.5,
  },
  {
    day: "Tue",
    hours: 3.2,
  },
  {
    day: "Wed",
    hours: 1.8,
  },
  {
    day: "Thu",
    hours: 4.1,
  },
  {
    day: "Fri",
    hours: 3.5,
  },
  {
    day: "Sat",
    hours: 5.2,
  },
  {
    day: "Sun",
    hours: 3.8,
  },
];

const subjects = [
  {
    name: "JavaScript",
    progress: 82,
    score: 88,
    questions: 120,
    color: "indigo",
  },
  {
    name: "React",
    progress: 74,
    score: 81,
    questions: 95,
    color: "purple",
  },
  {
    name: "Node.js",
    progress: 68,
    score: 76,
    questions: 80,
    color: "blue",
  },
  {
    name: "MongoDB",
    progress: 61,
    score: 72,
    questions: 65,
    color: "violet",
  },
  {
    name: "SQL",
    progress: 79,
    score: 84,
    questions: 90,
    color: "indigo",
  },
  {
    name: "DSA",
    progress: 52,
    score: 65,
    questions: 70,
    color: "purple",
  },
];

const recentActivities = [
  {
    icon: MessageCircle,
    title: "AI Chat Session",
    description:
      "Discussed React Hooks with AI StudyMate",
    time: "20 minutes ago",
    type: "AI Chat",
  },
  {
    icon: FileText,
    title: "PDF Summary Created",
    description:
      "JavaScript Interview Questions.pdf",
    time: "2 hours ago",
    type: "PDF",
  },
  {
    icon: BookOpen,
    title: "Notes Updated",
    description:
      "Added notes about MongoDB Aggregation",
    time: "Yesterday",
    type: "Notes",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Practice",
    description:
      "Completed JavaScript technical questions",
    time: "Yesterday",
    type: "Placement",
  },
  {
    icon: Mic,
    title: "Voice Note Recorded",
    description:
      "React Interview Revision",
    time: "2 days ago",
    type: "Voice Note",
  },
];

const achievements = [
  {
    icon: Flame,
    title: "7 Day Streak",
    description:
      "Studied for 7 consecutive days",
    unlocked: true,
  },
  {
    icon: BookOpen,
    title: "Note Master",
    description:
      "Created 25 study notes",
    unlocked: true,
  },
  {
    icon: Brain,
    title: "AI Explorer",
    description:
      "Completed 50 AI conversations",
    unlocked: true,
  },
  {
    icon: Trophy,
    title: "Placement Ready",
    description:
      "Complete 100 placement questions",
    unlocked: false,
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function Progress() {
  const [period, setPeriod] =
    useState("Week");

  const overallProgress = 76;

  const totalStudyHours =
    weeklyStudyData.reduce(
      (total, item) =>
        total + item.hours,
      0
    );

  const averageHours =
    (
      totalStudyHours /
      weeklyStudyData.length
    ).toFixed(1);

  const highestStudyDay =
    weeklyStudyData.reduce(
      (highest, current) =>
        current.hours >
        highest.hours
          ? current
          : highest
    );

  const completedGoals = 18;
  const totalGoals = 24;

  const goalProgress = Math.round(
    (completedGoals /
      totalGoals) *
      100
  );

  const strongestSubject =
    useMemo(() => {
      return subjects.reduce(
        (best, current) =>
          current.score >
          best.score
            ? current
            : best
      );
    }, []);

  const weakestSubject =
    useMemo(() => {
      return subjects.reduce(
        (weakest, current) =>
          current.score <
          weakest.score
            ? current
            : weakest
      );
    }, []);

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
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">

              <TrendingUp
                size={19}
              />

            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              LEARNING ANALYTICS
            </p>

          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Learning Progress
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Track your study activities, understand your
            performance, and improve your learning habits.
          </p>

        </div>

        {/* Period Selector */}

        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

          {[
            "Week",
            "Month",
            "Year",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setPeriod(item)
              }
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                period === item
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </motion.div>

      {/* =================================================
          OVERALL PROGRESS
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

        <div className="grid gap-7 lg:grid-cols-3">

          {/* Progress */}

          <div className="lg:col-span-2">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-indigo-100">
                  Overall Learning Progress
                </p>

                <div className="mt-1 flex items-end gap-2">

                  <h2 className="text-4xl font-black">
                    {overallProgress}%
                  </h2>

                  <span className="mb-1 flex items-center gap-1 text-xs font-bold text-emerald-200">
                    <ArrowUpRight
                      size={13}
                    />
                    12%
                  </span>

                </div>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">

                <TrendingUp
                  size={22}
                />

              </div>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">

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
              You are making good progress. Keep your
              study consistency to reach your goals.
            </p>

          </div>

          {/* Goal */}

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-indigo-100">
                  Weekly Goal
                </p>

                <p className="mt-1 text-xl font-black">
                  {completedGoals}/
                  {totalGoals}
                </p>

              </div>

              <Target
                size={21}
              />

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">

              <div
                style={{
                  width: `${goalProgress}%`,
                }}
                className="h-full rounded-full bg-white"
              />

            </div>

            <p className="mt-2 text-[10px] text-indigo-100">
              {goalProgress}% of your weekly goals completed
            </p>

          </div>

        </div>

      </motion.div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <ProgressStat
          icon={Clock3}
          title="Study Time"
          value={`${totalStudyHours.toFixed(
            1
          )}h`}
          change="+18%"
          positive
        />

        <ProgressStat
          icon={BookOpen}
          title="Notes Created"
          value="28"
          change="+6"
          positive
        />

        <ProgressStat
          icon={MessageCircle}
          title="AI Conversations"
          value="64"
          change="+14%"
          positive
        />

        <ProgressStat
          icon={BriefcaseBusiness}
          title="Placement Score"
          value="78%"
          change="+9%"
          positive
        />

      </div>

      {/* =================================================
          CHART + DAILY SUMMARY
      ================================================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* Weekly Chart */}

        <motion.section
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Study Activity
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Weekly Study Hours
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <BarChart3
                size={19}
              />

            </div>

          </div>

          {/* Chart */}

          <div className="mt-8 flex h-64 items-end justify-between gap-2 sm:gap-4">

            {weeklyStudyData.map(
              (item, index) => {

                const height =
                  (item.hours /
                    6) *
                  100;

                const isHighest =
                  item.day ===
                  highestStudyDay.day;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >

                    <div className="relative flex h-full w-full items-end justify-center">

                      {isHighest && (

                        <span className="absolute bottom-[calc(100%-30px)] mb-2 rounded-lg bg-slate-900 px-2 py-1 text-[9px] font-bold text-white">
                          {item.hours}h
                        </span>

                      )}

                      <motion.div
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${height}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay:
                            index *
                            0.05,
                        }}
                        className={`w-full max-w-[42px] rounded-t-xl transition ${
                          isHighest
                            ? "bg-gradient-to-t from-purple-600 to-indigo-500"
                            : "bg-indigo-100 hover:bg-indigo-300"
                        }`}
                      />

                    </div>

                    <span className="mt-3 text-[10px] font-bold text-slate-400">
                      {item.day}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </motion.section>

        {/* Study Summary */}

        <motion.section
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Summary
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Your Study Week
              </h2>

            </div>

            <Activity
              size={20}
              className="text-indigo-500"
            />

          </div>

          <div className="mt-6 space-y-5">

            <SummaryRow
              icon={Clock3}
              title="Average daily study"
              value={`${averageHours} hrs`}
            />

            <SummaryRow
              icon={CalendarDays}
              title="Most productive day"
              value={highestStudyDay.day}
            />

            <SummaryRow
              icon={Flame}
              title="Current streak"
              value="7 days"
            />

            <SummaryRow
              icon={Target}
              title="Goal completion"
              value={`${goalProgress}%`}
            />

          </div>

          <div className="mt-6 rounded-2xl bg-indigo-50 p-4">

            <div className="flex gap-3">

              <Zap
                size={18}
                className="shrink-0 text-indigo-600"
              />

              <div>

                <p className="text-xs font-bold text-indigo-700">
                  Keep Going!
                </p>

                <p className="mt-1 text-[10px] leading-5 text-indigo-600">
                  You studied more than your average on{" "}
                  {highestStudyDay.day}. Try maintaining
                  this consistency.
                </p>

              </div>

            </div>

          </div>

        </motion.section>

      </div>

      {/* =================================================
          SUBJECT PERFORMANCE
      ================================================= */}

      <motion.section
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
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Performance
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Subject-wise Progress
            </h2>

          </div>

          <BarChart3
            size={21}
            className="text-indigo-500"
          />

        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {subjects.map(
            (subject) => (
              <SubjectCard
                key={subject.name}
                subject={
                  subject
                }
              />
            )
          )}

        </div>

      </motion.section>

      {/* =================================================
          STRONG + WEAK AREAS
      ================================================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Strongest */}

        <motion.section
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

              <Award
                size={21}
              />

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Strongest Subject
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                {strongestSubject.name}
              </h2>

            </div>

          </div>

          <div className="mt-5 flex items-end justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Current score
              </p>

              <p className="mt-1 text-3xl font-black text-emerald-600">
                {strongestSubject.score}%
              </p>

            </div>

            <CheckCircle2
              size={38}
              className="text-emerald-400"
            />

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">

            <div
              style={{
                width: `${strongestSubject.score}%`,
              }}
              className="h-full rounded-full bg-emerald-500"
            />

          </div>

        </motion.section>

        {/* Weakest */}

        <motion.section
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="rounded-3xl border border-amber-100 bg-amber-50/50 p-5"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">

              <AlertTriangle
                size={21}
              />

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Needs Improvement
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                {weakestSubject.name}
              </h2>

            </div>

          </div>

          <div className="mt-5 flex items-end justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Current score
              </p>

              <p className="mt-1 text-3xl font-black text-amber-600">
                {weakestSubject.score}%
              </p>

            </div>

            <AlertTriangle
              size={38}
              className="text-amber-400"
            />

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-amber-100">

            <div
              style={{
                width: `${weakestSubject.score}%`,
              }}
              className="h-full rounded-full bg-amber-500"
            />

          </div>

          <p className="mt-3 text-[10px] text-amber-700">
            Spend more study time practicing{" "}
            {weakestSubject.name}.
          </p>

        </motion.section>

      </div>

      {/* =================================================
          RECENT ACTIVITY
      ================================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
        }}
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Activity
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Recent Learning Activity
            </h2>

          </div>

          <button className="hidden items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 sm:flex">

            View All

            <ChevronRight
              size={14}
            />

          </button>

        </div>

        <div className="mt-5 divide-y divide-slate-100">

          {recentActivities.map(
            (activity) => {

              const Icon =
                activity.icon;

              return (
                <div
                  key={
                    activity.title
                  }
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                    <Icon
                      size={17}
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-bold text-slate-800">
                      {activity.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {activity.description}
                    </p>

                  </div>

                  <div className="hidden text-right sm:block">

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
                      {activity.type}
                    </span>

                    <p className="mt-1 text-[9px] text-slate-400">
                      {activity.time}
                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </motion.section>

      {/* =================================================
          ACHIEVEMENTS
      ================================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Achievements
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Your Learning Milestones
            </h2>

          </div>

          <Trophy
            size={21}
            className="text-indigo-500"
          />

        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {achievements.map(
            (achievement) => (
              <AchievementCard
                key={
                  achievement.title
                }
                achievement={
                  achievement
                }
              />
            )
          )}

        </div>

      </motion.section>

      {/* =================================================
          AI RECOMMENDATION
      ================================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.45,
        }}
        className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6"
      >

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">

              <Brain
                size={22}
              />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  AI StudyMate Recommendation
                </p>

                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[8px] font-bold text-purple-600">
                  AI
                </span>

              </div>

              <h2 className="mt-2 text-lg font-black text-slate-900">
                Focus more on {weakestSubject.name}
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                Your current performance in{" "}
                {weakestSubject.name} is{" "}
                {weakestSubject.score}%. AI StudyMate recommends
                spending your next few study sessions on this subject.
              </p>

            </div>

          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700">

            Create Study Plan

            <ArrowUpRight
              size={14}
            />

          </button>

        </div>

      </motion.section>

    </div>
  );
}

/* =====================================================
   PROGRESS STAT
===================================================== */

function ProgressStat({
  icon: Icon,
  title,
  value,
  change,
  positive,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/30"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Icon size={18} />

        </div>

        <span
          className={`flex items-center gap-0.5 text-[10px] font-bold ${
            positive
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >

          {positive ? (
            <ArrowUpRight
              size={11}
            />
          ) : (
            <ArrowDownRight
              size={11}
            />
          )}

          {change}

        </span>

      </div>

      <p className="mt-4 text-xs text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>

    </motion.div>
  );
}

/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-indigo-600">

        <Icon size={16} />

      </div>

      <div className="flex-1">

        <p className="text-xs text-slate-500">
          {title}
        </p>

      </div>

      <p className="text-sm font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}

/* =====================================================
   SUBJECT CARD
===================================================== */

function SubjectCard({
  subject,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-sm font-black text-slate-800">
            {subject.name}
          </h3>

          <p className="mt-1 text-[10px] text-slate-400">
            {subject.questions} questions practiced
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-xs font-black text-indigo-600">

          {subject.score}%

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-[10px] font-semibold text-slate-400">
          Progress
        </span>

        <span className="text-[10px] font-bold text-indigo-600">
          {subject.progress}%
        </span>

      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${subject.progress}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
        />

      </div>

    </motion.div>
  );
}

/* =====================================================
   ACHIEVEMENT CARD
===================================================== */

function AchievementCard({
  achievement,
}) {
  const Icon =
    achievement.icon;

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`rounded-2xl border p-5 ${
        achievement.unlocked
          ? "border-indigo-100 bg-indigo-50/50"
          : "border-slate-200 bg-slate-50 opacity-60"
      }`}
    >

      <div className="flex items-center justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            achievement.unlocked
              ? "bg-indigo-100 text-indigo-600"
              : "bg-slate-200 text-slate-400"
          }`}
        >

          <Icon size={20} />

        </div>

        {achievement.unlocked && (

          <CheckCircle2
            size={17}
            className="text-emerald-500"
          />

        )}

      </div>

      <h3 className="mt-4 text-sm font-black text-slate-800">
        {achievement.title}
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-400">
        {achievement.description}
      </p>

    </motion.div>
  );
}

export default Progress;