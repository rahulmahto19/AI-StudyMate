import {
  ArrowLeft,
  HelpCircle,
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

export default function CreateQuestion() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
      category: "",
      topic: "",
      difficulty: "",
      marks: "2",
      explanation: "",
    });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(
      "Mock create question:",
      form
    );

    navigate(
      "/admin/placement/questions"
    );
  };

  return (
    <AdminPage>
      <PageHeader
        title="Create Question"
        description="Add a new question to the placement question bank."
        icon={HelpCircle}
        action={
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() =>
              navigate(
                "/admin/placement/questions"
              )
            }
          >
            Back
          </Button>
        }
      />

      <form
        onSubmit={submit}
        className="space-y-6"
      >
        <Card
          title="Question"
          description="Write the question and provide four answer options."
        >
          <textarea
            required
            rows={5}
            value={form.question}
            onChange={(e) =>
              update(
                "question",
                e.target.value
              )
            }
            placeholder="Enter your question..."
            className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Option
              label="Option A"
              value={form.optionA}
              onChange={(value) =>
                update("optionA", value)
              }
            />

            <Option
              label="Option B"
              value={form.optionB}
              onChange={(value) =>
                update("optionB", value)
              }
            />

            <Option
              label="Option C"
              value={form.optionC}
              onChange={(value) =>
                update("optionC", value)
              }
            />

            <Option
              label="Option D"
              value={form.optionD}
              onChange={(value) =>
                update("optionD", value)
              }
            />
          </div>
        </Card>

        <Card
          title="Question Configuration"
          description="Classify the question and select the correct answer."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              value={form.answer}
              onChange={(value) =>
                update("answer", value)
              }
              placeholder="Correct Answer"
              options={[
                {
                  value: "Option A",
                  label: "Option A",
                },
                {
                  value: "Option B",
                  label: "Option B",
                },
                {
                  value: "Option C",
                  label: "Option C",
                },
                {
                  value: "Option D",
                  label: "Option D",
                },
              ]}
            />

            <Select
              value={form.category}
              onChange={(value) =>
                update(
                  "category",
                  value
                )
              }
              placeholder="Category"
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

            <input
              value={form.topic}
              onChange={(e) =>
                update(
                  "topic",
                  e.target.value
                )
              }
              placeholder="Topic"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />

            <Select
              value={form.difficulty}
              onChange={(value) =>
                update(
                  "difficulty",
                  value
                )
              }
              placeholder="Difficulty"
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

            <input
              type="number"
              min="1"
              value={form.marks}
              onChange={(e) =>
                update(
                  "marks",
                  e.target.value
                )
              }
              placeholder="Marks"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Explanation
            </label>

            <textarea
              rows={4}
              value={form.explanation}
              onChange={(e) =>
                update(
                  "explanation",
                  e.target.value
                )
              }
              placeholder="Explain why the answer is correct..."
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                "/admin/placement/questions"
              )
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            icon={Save}
          >
            Save Question
          </Button>
        </div>
      </form>
    </AdminPage>
  );
}

function Option({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        required
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={`Enter ${label}`}
        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
      />
    </div>
  );
}