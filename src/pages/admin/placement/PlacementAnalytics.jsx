import {
  BarChart3,
  TrendingUp,
  Users,
  Trophy,
  Target,
} from "lucide-react";

import {
  AdminPage,
  PageHeader,
  Card,
  StatCard,
  ProgressBar,
} from "../../../components/admin/AdminUI";

import {
  categoryPerformance,
  registrationData,
} from "../../../data/adminMockData";

export default function PlacementAnalytics() {
  const maxAttempts = Math.max(
    ...categoryPerformance.map(
      (item) => item.attempts
    )
  );

  return (
    <AdminPage>
      <PageHeader
        title="Placement Analytics"
        description="Analyze test attempts, scores, completion and category performance."
        icon={BarChart3}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Average Score"
          value="76%"
          icon={TrendingUp}
          iconClass="bg-indigo-50 text-indigo-600"
          trend={4.6}
          trendLabel="this month"
        />

        <StatCard
          title="Pass Rate"
          value="76%"
          icon={Trophy}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Active Students"
          value="1,084"
          icon={Users}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Completion Rate"
          value="84%"
          icon={Target}
          iconClass="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Category Comparison"
          description="Average score across preparation categories"
        >
          <div className="space-y-6">
            {categoryPerformance.map(
              (item) => (
                <ProgressBar
                  key={item.category}
                  label={item.category}
                  value={item.score}
                />
              )
            )}
          </div>
        </Card>

        <Card
          title="Test Attempts by Category"
          description="Relative number of assessment attempts"
        >
          <div className="space-y-5">
            {categoryPerformance.map(
              (item) => {
                const width =
                  (item.attempts /
                    maxAttempts) *
                  100;

                return (
                  <div
                    key={item.category}
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {item.category}
                      </span>

                      <span className="text-sm font-bold text-slate-800">
                        {item.attempts.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Card>
      </div>

      <Card
        title="Student Registration Trend"
        description="Growth of the student base over recent months"
      >
        <div className="grid h-72 grid-cols-5 items-end gap-4">
          {registrationData.map(
            (item) => {
              const max =
                Math.max(
                  ...registrationData.map(
                    (x) => x.students
                  )
                );

              const height =
                (item.students / max) *
                100;

              return (
                <div
                  key={item.month}
                  className="flex h-full flex-col justify-end"
                >
                  <div className="relative flex flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-16 rounded-t-xl bg-indigo-500 transition-all hover:bg-indigo-600"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-center text-xs text-slate-400">
                    {item.month}
                  </p>

                  <p className="text-center text-xs font-semibold text-slate-700">
                    {item.students}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </Card>
    </AdminPage>
  );
}