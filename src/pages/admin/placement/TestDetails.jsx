import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Edit3,
  HelpCircle,
  Target,
  Users,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  AdminPage,
  PageHeader,
  Card,
  Badge,
  Button,
  ProgressBar,
  StatCard,
} from "../../../components/admin/AdminUI";

import { tests } from "../../../data/adminMockData";

export default function TestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const test = tests.find(
    (item) => item.id === id
  );

  if (!test) {
    return (
      <AdminPage>
        <PageHeader
          title="Test Not Found"
          description="The selected test does not exist."
        />

        <Button
          icon={ArrowLeft}
          onClick={() =>
            navigate(
              "/admin/placement/tests"
            )
          }
        >
          Back to Tests
        </Button>
      </AdminPage>
    );
  }

  const passRate = 76;

  return (
    <AdminPage>
      <PageHeader
        title={test.title}
        description="Test configuration, performance and usage overview."
        icon={ClipboardList}
        action={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              onClick={() =>
                navigate(
                  "/admin/placement/tests"
                )
              }
            >
              Back
            </Button>

            <Button icon={Edit3}>
              Edit Test
            </Button>
          </div>
        }
      />

      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="indigo">
                {test.category}
              </Badge>

              <Badge
                variant={
                  test.difficulty ===
                  "Hard"
                    ? "danger"
                    : test.difficulty ===
                      "Medium"
                    ? "warning"
                    : "success"
                }
              >
                {test.difficulty}
              </Badge>

              <Badge variant="success">
                {test.status}
              </Badge>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Assessment designed to evaluate student preparation and identify areas requiring further improvement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Quick
              icon={Clock3}
              label="Duration"
              value={`${test.duration} min`}
            />

            <Quick
              icon={Target}
              label="Passing"
              value={test.passingMarks}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Questions"
          value={test.questions}
          icon={HelpCircle}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Attempts"
          value={test.attempts}
          icon={Users}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Total Marks"
          value={test.totalMarks}
          icon={Target}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Performance"
          description="Overall test performance"
        >
          <ProgressBar
            label="Pass Rate"
            value={passRate}
          />

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Info
              label="Passing Marks"
              value={test.passingMarks}
            />

            <Info
              label="Total Marks"
              value={test.totalMarks}
            />

            <Info
              label="Duration"
              value={`${test.duration} minutes`}
            />

            <Info
              label="Questions"
              value={test.questions}
            />
          </div>
        </Card>

        <Card
          title="Test Settings"
          description="Current assessment configuration"
        >
          <div className="space-y-4">
            <Setting
              label="Randomize Questions"
              value="Enabled"
            />

            <Setting
              label="Randomize Options"
              value="Enabled"
            />

            <Setting
              label="Show Result"
              value="Enabled"
            />

            <Setting
              label="Show Explanations"
              value="Enabled"
            />

            <Setting
              label="Attempts Allowed"
              value="1"
            />
          </div>
        </Card>
      </div>

      <Card
        title="Recent Test Activity"
        description="Latest attempts on this assessment"
      >
        <div className="space-y-3">
          {[
            "Rahul Sharma scored 86.67%",
            "Priya Singh scored 95%",
            "Aman Kumar scored 42%",
          ].map((text, index) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <CalendarClock size={15} />
              </div>

              <span className="text-sm text-slate-600">
                {text}
              </span>

              <span className="ml-auto text-xs text-slate-400">
                {index + 1}h ago
              </span>
            </div>
          ))}
        </div>
      </Card>
    </AdminPage>
  );
}

function Quick({
  icon: Icon,
  label,
  value,
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

      <p className="text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function Setting({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
      <span className="text-sm text-slate-600">
        {label}
      </span>

      <Badge variant="success">
        {value}
      </Badge>
    </div>
  );
}