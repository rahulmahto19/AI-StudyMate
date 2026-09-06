import {
  Activity,
  ArrowUpRight,
  Bot,
  FileText,
  GraduationCap,
  Target,
  Trophy,
  Users,
  ClipboardCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  AdminPage,
  PageHeader,
  StatCard,
  Card,
  Badge,
  Button,
  ProgressBar,
} from "../../components/admin/AdminUI";

import {
  adminStats,
  activities,
  topStudents,
  categoryPerformance,
  registrationData,
} from "../../data/adminMockData";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: adminStats.totalStudents.toLocaleString(),
      subtitle: "Registered students",
      icon: Users,
      trend: 12.4,
      trendLabel: "vs last month",
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Active Students",
      value: adminStats.activeStudents.toLocaleString(),
      subtitle: "Currently active",
      icon: Activity,
      trend: 8.2,
      trendLabel: "vs last month",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Test Attempts",
      value: adminStats.testAttempts.toLocaleString(),
      subtitle: "Placement assessments",
      icon: ClipboardCheck,
      trend: 15.8,
      trendLabel: "vs last month",
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Average Score",
      value: `${adminStats.averageScore}%`,
      subtitle: "Across all tests",
      icon: Trophy,
      trend: 4.6,
      trendLabel: "vs last month",
      iconClass: "bg-amber-50 text-amber-600",
    },
    {
      title: "AI Chat Sessions",
      value: adminStats.aiChatSessions.toLocaleString(),
      subtitle: "Learning conversations",
      icon: Bot,
      trend: 18.3,
      trendLabel: "vs last month",
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      title: "PDF Summaries",
      value: adminStats.pdfSummaries.toLocaleString(),
      subtitle: "Generated summaries",
      icon: FileText,
      trend: 10.7,
      trendLabel: "vs last month",
      iconClass: "bg-rose-50 text-rose-600",
    },
  ];

  const maxRegistration = Math.max(
    ...registrationData.map((item) => item.students)
  );

  return (
    <AdminPage>
      <PageHeader
        title="Dashboard"
        description="Monitor your AI StudyMate platform and student activity."
        icon={GraduationCap}
      />

      {/* Stats */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Registration Chart */}

        <Card
          title="Student Registration"
          description="Monthly registration trend"
          className="xl:col-span-2"
        >
          <div className="flex h-72 items-end gap-3 sm:gap-5">
            {registrationData.map((item) => {
              const height =
                (item.students / maxRegistration) *
                100;

              return (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  <div className="relative flex flex-1 items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${height}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1,
                      }}
                      className="w-full max-w-12 rounded-t-xl bg-indigo-500 transition-all group-hover:bg-indigo-600"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                        {item.students}
                      </div>
                    </motion.div>
                  </div>

                  <p className="mt-3 text-center text-xs font-medium text-slate-400">
                    {item.month}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Category Performance */}

        <Card
          title="Category Performance"
          description="Average score by category"
        >
          <div className="space-y-6">
            {categoryPerformance.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.category}
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {item.score}%
                  </span>
                </div>

                <ProgressBar
                  value={item.score}
                  showValue={false}
                />

                <p className="mt-1 text-[11px] text-slate-400">
                  {item.attempts.toLocaleString()} attempts
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Activity */}

        <Card
          title="Recent Activity"
          description="Latest student actions"
          action={
            <Button
              variant="ghost"
              size="sm"
            >
              View all
              <ArrowUpRight size={14} />
            </Button>
          }
        >
          <div className="space-y-5">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="flex gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Activity size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">
                      {activity.student}
                    </span>{" "}
                    {activity.action}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-indigo-600">
                    {activity.target}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Top Students */}

        <Card
          title="Top Performing Students"
          description="Highest average performance"
        >
          <div className="space-y-3">
            {topStudents.map((student, index) => (
              <motion.div
                key={student.name}
                whileHover={{
                  x: 3,
                }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                  #{index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {student.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {student.tests} tests completed
                  </p>
                </div>

                <Badge variant="success">
                  {student.score}%
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </AdminPage>
  );
}