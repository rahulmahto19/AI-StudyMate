import {
  ArrowLeft,
  ClipboardList,
  Save,
} from "lucide-react";

import {
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  AdminPage,
  PageHeader,
  Card,
  Button,
  Select,
} from "../../../components/admin/AdminUI";

export default function CreateTest() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      duration: "30",
      totalMarks: "50",
      passingMarks: "25",
      attempts: "1",
      randomizeQuestions: true,
      randomizeOptions: false,
      showResult: true,
      showAnswers: false,
      showExplanations: true,
      status: "Draft",
    });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "Mock create test:",
      form
    );

    navigate(
      "/admin/placement/tests"
    );
  };

  return (
    <AdminPage>
      <PageHeader
        title="Create Placement Test"
        description="Configure a new assessment for student preparation."
        icon={ClipboardList}
        action={
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
        }
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Card
          title="Basic Information"
          description="Define the test title, category and difficulty."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="Test Title"
              required
              value={form.title}
              onChange={(value) =>
                update("title", value)
              }
              placeholder="e.g. JavaScript Technical Assessment"
            />

            <Select
              value={form.category}
              onChange={(value) =>
                update("category", value)
              }
              placeholder="Select Category"
              options={[
                {
                  value: "Aptitude",
                  label: "Aptitude",
                },
                {
                  value: "Technical",
                  label: "Technical",
                },
                {
                  value: "Interview",
                  label: "Interview",
                },
              ]}
            />

            <Select
              value={form.difficulty}
              onChange={(value) =>
                update(
                  "difficulty",
                  value
                )
              }
              placeholder="Select Difficulty"
              options={[
                {
                  value: "Easy",
                  label: "Easy",
                },
                {
                  value: "Medium",
                  label: "Medium",
                },
                {
                  value: "Hard",
                  label: "Hard",
                },
              ]}
            />

            <Field
              label="Duration"
              value={form.duration}
              onChange={(value) =>
                update(
                  "duration",
                  value
                )
              }
              type="number"
              suffix="minutes"
            />

            <Field
              label="Total Marks"
              value={form.totalMarks}
              onChange={(value) =>
                update(
                  "totalMarks",
                  value
                )
              }
              type="number"
            />

            <Field
              label="Passing Marks"
              value={form.passingMarks}
              onChange={(value) =>
                update(
                  "passingMarks",
                  value
                )
              }
              type="number"
            />
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
              rows={4}
              placeholder="Describe the purpose and coverage of this test..."
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </Card>

        <Card
          title="Test Configuration"
          description="Control attempts, randomization and result visibility."
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Toggle
              label="Randomize Questions"
              checked={form.randomizeQuestions}
              onChange={(value) =>
                update(
                  "randomizeQuestions",
                  value
                )
              }
            />

            <Toggle
              label="Randomize Options"
              checked={form.randomizeOptions}
              onChange={(value) =>
                update(
                  "randomizeOptions",
                  value
                )
              }
            />

            <Toggle
              label="Show Result"
              checked={form.showResult}
              onChange={(value) =>
                update(
                  "showResult",
                  value
                )
              }
            />

            <Toggle
              label="Show Correct Answers"
              checked={form.showAnswers}
              onChange={(value) =>
                update(
                  "showAnswers",
                  value
                )
              }
            />

            <Toggle
              label="Show Explanations"
              checked={form.showExplanations}
              onChange={(value) =>
                update(
                  "showExplanations",
                  value
                )
              }
            />
          </div>

          <div className="mt-5 max-w-xs">
            <Field
              label="Attempts Allowed"
              value={form.attempts}
              onChange={(value) =>
                update(
                  "attempts",
                  value
                )
              }
              type="number"
            />
          </div>
        </Card>

        <Card
          title="Publishing"
          description="Choose whether the test is available to students."
        >
          <Select
            value={form.status}
            onChange={(value) =>
              update("status", value)
            }
            options={[
              {
                value: "Draft",
                label: "Draft",
              },
              {
                value: "Published",
                label: "Published",
              },
            ]}
          />
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                "/admin/placement/tests"
              )
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            icon={Save}
          >
            Save Test
          </Button>
        </div>
      </form>
    </AdminPage>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
  required,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className="flex items-center justify-between rounded-xl border border-slate-200 p-4 text-left"
    >
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <span
        className={`relative h-6 w-11 rounded-full transition ${
          checked
            ? "bg-indigo-600"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </span>
    </button>
  );
}