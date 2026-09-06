import {
  Eye,
  HelpCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  AdminPage,
  PageHeader,
  Card,
  SearchInput,
  Select,
  Badge,
  Button,
  Modal,
  ConfirmDialog,
} from "../../../components/admin/AdminUI";

import {
  questions as initialQuestions,
} from "../../../data/adminMockData";

export default function QuestionBank() {
  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState(initialQuestions);

  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const filtered = useMemo(
    () =>
      questions.filter((question) => {
        const matchesSearch =
          question.question
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          question.topic
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty =
          !difficulty ||
          question.difficulty ===
            difficulty;

        return (
          matchesSearch &&
          matchesDifficulty
        );
      }),
    [questions, search, difficulty]
  );

  const removeQuestion = () => {
    if (!deleteItem) return;

    setQuestions((current) =>
      current.filter(
        (item) =>
          item.id !== deleteItem.id
      )
    );

    setDeleteItem(null);
  };

  return (
    <AdminPage>
      <PageHeader
        title="Question Bank"
        description="Create and manage questions used across placement assessments."
        icon={HelpCircle}
        action={
          <Button
            icon={Plus}
            onClick={() =>
              navigate(
                "/admin/placement/questions/create"
              )
            }
          >
            Add Question
          </Button>
        }
      />

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search questions or topics..."
          />

          <Select
            value={difficulty}
            onChange={setDifficulty}
            placeholder="All Difficulty"
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
        </div>

        <div className="space-y-3">
          {filtered.map((question) => (
            <div
              key={question.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-100 hover:shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600">
                  Q
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {question.question}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="indigo">
                      {question.category}
                    </Badge>

                    <Badge>
                      {question.topic}
                    </Badge>

                    <Badge
                      variant={
                        question.difficulty ===
                        "Hard"
                          ? "danger"
                          : question.difficulty ===
                            "Medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {question.difficulty}
                    </Badge>

                    <Badge>
                      {question.marks} marks
                    </Badge>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() =>
                      setSelected(
                        question
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Eye size={16} />
                  </button>

                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      setDeleteItem(
                        question
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Question Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Question
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-700">
                {selected.question}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Correct Answer
              </p>

              <p className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                {selected.answer}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Used In
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {selected.usedIn}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={removeQuestion}
        title="Delete question?"
        description="The selected question will be removed from the mock question bank."
        confirmText="Delete Question"
      />
    </AdminPage>
  );
}