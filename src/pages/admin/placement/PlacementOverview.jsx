import {
  BarChart3,
  ClipboardCheck,
  HelpCircle,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  AdminPage,
  PageHeader,
  StatCard,
  Card,
  Button,
  ProgressBar,
} from "../../../components/admin/AdminUI";

import {
  adminStats,
  categoryPerformance,
} from "../../../data/adminMockData";

export default function PlacementOverview() {
  const navigate = useNavigate();

  return (
    <AdminPage>
      <PageHeader
        title="Placement Preparation"
        description="Manage aptitude, technical, interview and resume-based preparation."
        icon={Target}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tests"
          value={adminStats.totalTests}
          icon={ClipboardCheck}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Test Attempts"
          value="3,820"
          icon={Trophy}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Question Bank"
          value="1,284"
          icon={HelpCircle}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Students"
          value="1,084"
          icon={Users}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <Card
        title="Placement Modules"
        description="Manage each preparation category"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Module
            title="Aptitude"
            description="Quantitative, logical reasoning and verbal ability."
            icon={Target}
            color="bg-blue-50 text-blue-600"
            onClick={() =>
              navigate(
                "/admin/placement/tests"
              )
            }
          />

          <Module
            title="Technical"
            description="Programming, CS fundamentals and technical MCQs."
            icon={ClipboardCheck}
            color="bg-indigo-50 text-indigo-600"
            onClick={() =>
              navigate(
                "/admin/placement/tests"
              )
            }
          />

          <Module
            title="Interview"
            description="Technical and HR interview preparation."
            icon={Trophy}
            color="bg-purple-50 text-purple-600"
            onClick={() =>
              navigate(
                "/admin/placement/tests"
              )
            }
          />

          <Module
            title="Analytics"
            description="Track preparation performance and trends."
            icon={BarChart3}
            color="bg-emerald-50 text-emerald-600"
            onClick={() =>
              navigate(
                "/admin/placement/analytics"
              )
            }
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Category Performance"
          description="Current placement preparation scores"
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
          title="Quick Actions"
          description="Frequently used placement management tools"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  "/admin/placement/tests/create"
                )
              }
            >
              Create Test
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  "/admin/placement/questions/create"
                )
              }
            >
              Add Question
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  "/admin/placement/results"
                )
              }
            >
              View Results
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  "/admin/placement/students"
                )
              }
            >
              Student Performance
            </Button>
          </div>
        </Card>
      </div>
    </AdminPage>
  );
}

function Module({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-100"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={20} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </button>
  );
}