import {
  ClipboardList,
  Eye,
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
  ConfirmDialog,
} from "../../../components/admin/AdminUI";

import {
  tests as initialTests,
} from "../../../data/adminMockData";

export default function PlacementTests() {
  const navigate = useNavigate();

  const [tests, setTests] =
    useState(initialTests);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [deleteItem, setDeleteItem] =
    useState(null);

  const filtered = useMemo(
    () =>
      tests.filter((test) => {
        const searchMatch =
          test.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const categoryMatch =
          !category ||
          test.category === category;

        const difficultyMatch =
          !difficulty ||
          test.difficulty === difficulty;

        return (
          searchMatch &&
          categoryMatch &&
          difficultyMatch
        );
      }),
    [tests, search, category, difficulty]
  );

  const removeTest = () => {
    if (!deleteItem) return;

    setTests((current) =>
      current.filter(
        (test) =>
          test.id !== deleteItem.id
      )
    );

    setDeleteItem(null);
  };

  return (
    <AdminPage>
      <PageHeader
        title="Placement Tests"
        description="Create and manage aptitude, technical and interview tests."
        icon={ClipboardList}
        action={
          <Button
            icon={Plus}
            onClick={() =>
              navigate(
                "/admin/placement/tests/create"
              )
            }
          >
            Create Test
          </Button>
        }
      />

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_180px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search tests..."
          />

          <Select
            value={category}
            onChange={setCategory}
            placeholder="All Categories"
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Test",
                  "Category",
                  "Difficulty",
                  "Duration",
                  "Marks",
                  "Questions",
                  "Attempts",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((test) => (
                <tr
                  key={test.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {test.title}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {test.id}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <Badge variant="indigo">
                      {test.category}
                    </Badge>
                  </td>

                  <td className="px-4 py-4">
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
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {test.duration} min
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {test.totalMarks}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {test.questions}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {test.attempts}
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        test.status ===
                        "Published"
                          ? "success"
                          : "warning"
                      }
                    >
                      {test.status}
                    </Badge>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/placement/tests/${test.id}`
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
                          setDeleteItem(test)
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={removeTest}
        title="Delete test?"
        description="The selected test will be removed from the current mock dataset."
        confirmText="Delete Test"
      />
    </AdminPage>
  );
}