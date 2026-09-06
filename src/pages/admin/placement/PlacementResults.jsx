import {
  Eye,
  Search,
  Trophy,
  XCircle,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  AdminPage,
  PageHeader,
  Card,
  SearchInput,
  Select,
  Badge,
  StatCard,
  Modal,
} from "../../../components/admin/AdminUI";

import {
  results,
} from "../../../data/adminMockData";

export default function PlacementResults() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const filtered = useMemo(
    () =>
      results.filter((result) => {
        const searchMatch =
          result.student
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          result.test
            .toLowerCase()
            .includes(search.toLowerCase());

        const statusMatch =
          !status ||
          result.status === status;

        return (
          searchMatch &&
          statusMatch
        );
      }),
    [search, status]
  );

  return (
    <AdminPage>
      <PageHeader
        title="Test Results"
        description="Review placement test performance and question-level results."
        icon={Trophy}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Attempts"
          value="3,820"
          icon={Trophy}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Passed"
          value="2,903"
          icon={Trophy}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Failed"
          value="917"
          icon={XCircle}
          iconClass="bg-red-50 text-red-600"
        />
      </div>

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search student or test..."
          />

          <Select
            value={status}
            onChange={setStatus}
            placeholder="All Results"
            options={[
              {
                value: "Passed",
                label: "Passed",
              },
              {
                value: "Failed",
                label: "Failed",
              },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Student",
                  "Test",
                  "Category",
                  "Score",
                  "Percentage",
                  "Correct",
                  "Incorrect",
                  "Time",
                  "Status",
                  "View",
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
              {filtered.map((result) => (
                <tr
                  key={result.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                    {result.student}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {result.test}
                  </td>

                  <td className="px-4 py-4">
                    <Badge variant="indigo">
                      {result.category}
                    </Badge>
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                    {result.score}
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-indigo-600">
                    {result.percentage}%
                  </td>

                  <td className="px-4 py-4 text-sm text-emerald-600">
                    {result.correct}
                  </td>

                  <td className="px-4 py-4 text-sm text-red-500">
                    {result.incorrect}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {result.timeTaken}
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        result.status ===
                        "Passed"
                          ? "success"
                          : "danger"
                      }
                    >
                      {result.status}
                    </Badge>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() =>
                        setSelected(
                          result
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Result Details"
        description="Question-level performance preview"
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Info
                label="Student"
                value={selected.student}
              />

              <Info
                label="Score"
                value={selected.score}
              />

              <Info
                label="Percentage"
                value={`${selected.percentage}%`}
              />

              <Info
                label="Time"
                value={selected.timeTaken}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-600">
                  Correct Answers
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-700">
                  {selected.correct}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs text-red-600">
                  Incorrect Answers
                </p>

                <p className="mt-1 text-xl font-bold text-red-700">
                  {selected.incorrect}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Analysis
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Detailed question analysis will be available here when the backend result API is connected.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </AdminPage>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}