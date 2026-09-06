import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

import {
  AdminPage,
  PageHeader,
  Card,
  Badge,
  ProgressBar,
  StatCard,
} from "../../../components/admin/AdminUI";

import {
  studyPlans,
} from "../../../data/adminMockData";

export default function StudyPlanner() {
  return (
    <AdminPage>
      <PageHeader
        title="Study Planner"
        description="Monitor student study plans, completion and deadlines."
        icon={CalendarDays}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Active Plans"
          value="924"
          icon={CalendarDays}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Completion Rate"
          value="78%"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Needs Attention"
          value="84"
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <Card
        title="Student Study Plans"
        description="Current plan progress"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {studyPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {plan.student}
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-800">
                    {plan.title}
                  </h3>
                </div>

                <Badge
                  variant={
                    plan.status ===
                    "Needs Attention"
                      ? "warning"
                      : "success"
                  }
                >
                  {plan.status}
                </Badge>
              </div>

              <div className="mt-6">
                <ProgressBar
                  value={plan.completed}
                  label="Completion"
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Info
                  label="Subjects"
                  value={plan.subjects}
                  icon={Target}
                />

                <Info
                  label="Completed"
                  value={`${plan.completed}%`}
                  icon={CheckCircle2}
                />

                <Info
                  label="Deadline"
                  value={plan.deadline}
                  icon={CalendarDays}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AdminPage>
  );
}

function Info({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <Icon
        size={15}
        className="text-indigo-500"
      />

      <p className="mt-2 text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}