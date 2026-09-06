import {
  ArrowLeft,
  Bot,
  CalendarDays,
  FileText,
  Mail,
  MessageSquare,
  NotebookPen,
  Trophy,
  UserCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import {
  AdminPage,
  PageHeader,
  Card,
  Badge,
  Button,
  StatCard,
  ProgressBar,
} from "../../../components/admin/AdminUI";

import { users } from "../../../data/adminMockData";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = users.find(
    (item) => item.id === id
  );

  if (!user) {
    return (
      <AdminPage>
        <PageHeader
          title="User Not Found"
          description="The requested student does not exist in the mock dataset."
        />

        <Button
          onClick={() =>
            navigate("/admin/users")
          }
          icon={ArrowLeft}
        >
          Back to Users
        </Button>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <PageHeader
        title="User Details"
        description={`Detailed profile and learning activity for ${user.name}.`}
        icon={UserCircle}
        action={
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() =>
              navigate("/admin/users")
            }
          >
            Back
          </Button>
        }
      />

      {/* Profile */}

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <Badge variant="success">
                {user.status}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail size={14} />
                {user.email}
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                Joined {user.joined}
              </span>
            </div>
          </div>

          <Badge variant="indigo">
            {user.role}
          </Badge>
        </div>
      </Card>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tests Completed"
          value={user.tests}
          icon={Trophy}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Average Score"
          value={`${user.averageScore}%`}
          icon={Trophy}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="AI Sessions"
          value={user.aiSessions}
          icon={Bot}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="PDF Summaries"
          value={user.pdfs}
          icon={FileText}
          iconClass="bg-blue-50 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Profile information */}

        <Card
          title="Account Information"
          description="Basic account details"
        >
          <div className="space-y-4">
            <Info
              label="User ID"
              value={user.id}
            />

            <Info
              label="Email"
              value={user.email}
            />

            <Info
              label="Provider"
              value={user.provider}
            />

            <Info
              label="Joined"
              value={user.joined}
            />

            <Info
              label="Last Login"
              value={user.lastLogin}
            />

            <Info
              label="Role"
              value={user.role}
            />
          </div>
        </Card>

        {/* Learning summary */}

        <Card
          title="Learning Activity"
          description="Usage across StudyMate"
          className="xl:col-span-2"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ActivityCard
              icon={MessageSquare}
              title="AI Chat"
              value={`${user.aiSessions} sessions`}
              color="bg-purple-50 text-purple-600"
            />

            <ActivityCard
              icon={NotebookPen}
              title="Notes"
              value={`${user.notes} notes`}
              color="bg-indigo-50 text-indigo-600"
            />

            <ActivityCard
              icon={FileText}
              title="PDF Summaries"
              value={`${user.pdfs} generated`}
              color="bg-blue-50 text-blue-600"
            />

            <ActivityCard
              icon={Trophy}
              title="Tests"
              value={`${user.tests} completed`}
              color="bg-amber-50 text-amber-600"
            />
          </div>
        </Card>
      </div>

      <Card
        title="Overall Learning Performance"
        description="Current placement preparation performance"
      >
        <ProgressBar
          value={user.averageScore}
          label="Average Test Score"
        />
      </Card>
    </AdminPage>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}

function ActivityCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={18} />
      </div>

      <p className="text-sm font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {value}
      </p>
    </div>
  );
}