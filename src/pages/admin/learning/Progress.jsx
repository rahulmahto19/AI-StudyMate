import {
  Activity,
  Award,
  BarChart3,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  AdminPage,
  PageHeader,
  Card,
  StatCard,
  ProgressBar,
  Badge,
} from "../../../components/admin/AdminUI";

import {
  categoryPerformance,
  placementStudents,
} from "../../../data/adminMockData";

export default function Progress() {
  return (
    <AdminPage>
      <PageHeader
        title="Student Progress"
        description="Track learning progress and performance across StudyMate."
        icon={TrendingUp}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Learners"
          value="1,084"
          icon={Users}
          iconClass="bg-indigo-50 text-indigo-600"
          trend={8.2}
          trendLabel="this month"
        />

        <StatCard
          title="Avg. Progress"
          value="78%"
          icon={TrendingUp}
          iconClass="bg-emerald-50 text-emerald-600"
          trend={5.4}
          trendLabel="this month"
        />

        <StatCard
          title="Tests Completed"
          value="3,820"
          icon={Target}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="High Performers"
          value="286"
          icon={Award}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Category Progress"
          description="Average student score by category"
        >
          <div className="space-y-6">
            {categoryPerformance.map(
              (category) => (
                <div
                  key={category.category}
                >
                  <ProgressBar
                    label={category.category}
                    value={category.score}
                  />
                </div>
              )
            )}
          </div>
        </Card>

        <Card
          title="Performance Distribution"
          description="Students grouped by performance level"
        >
          <div className="space-y-4">
            <Distribution
              label="Excellent"
              value={286}
              percentage={26}
              variant="success"
            />

            <Distribution
              label="Good"
              value={442}
              percentage={41}
              variant="info"
            />

            <Distribution
              label="Average"
              value={278}
              percentage={26}
              variant="warning"
            />

            <Distribution
              label="Needs Attention"
              value={78}
              percentage={7}
              variant="danger"
            />
          </div>
        </Card>
      </div>

      <Card
        title="Student Performance"
        description="Placement preparation performance"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Student
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Tests
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Passed
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Average
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Highest
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {placementStudents.map(
                (student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                      {student.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {student.testsAttempted}
                    </td>

                    <td className="px-4 py-4 text-sm text-emerald-600">
                      {student.passed}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                      {student.average}%
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-indigo-600">
                      {student.highest}%
                    </td>

                    <td className="px-4 py-4">
                      <Badge variant="success">
                        {student.performance}
                      </Badge>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminPage>
  );
}

function Distribution({
  label,
  value,
  percentage,
  variant,
}) {
  const variants = {
    success:
      "bg-emerald-500",
    info:
      "bg-blue-500",
    warning:
      "bg-amber-500",
    danger:
      "bg-red-500",
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-800">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${variants[variant]}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}