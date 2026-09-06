import {
  Eye,
  Search,
  TrendingUp,
  Users,
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
  StatCard,
} from "../../../components/admin/AdminUI";

import {
  placementStudents,
} from "../../../data/adminMockData";

export default function PlacementStudents() {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [performance, setPerformance] =
    useState("");

  const filtered = useMemo(
    () =>
      placementStudents.filter(
        (student) => {
          const searchMatch =
            student.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const performanceMatch =
            !performance ||
            student.performance ===
              performance;

          return (
            searchMatch &&
            performanceMatch
          );
        }
      ),
    [search, performance]
  );

  return (
    <AdminPage>
      <PageHeader
        title="Placement Students"
        description="Review student preparation performance and test activity."
        icon={Users}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Students Preparing"
          value="1,084"
          icon={Users}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Avg. Score"
          value="78%"
          icon={TrendingUp}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Top Performers"
          value="286"
          icon={TrendingUp}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search students..."
          />

          <Select
            value={performance}
            onChange={setPerformance}
            placeholder="All Performance"
            options={[
              {
                value: "Excellent",
                label: "Excellent",
              },
              {
                value: "Good",
                label: "Good",
              },
              {
                value: "Average",
                label: "Average",
              },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Student",
                  "Tests Attempted",
                  "Passed",
                  "Failed",
                  "Average",
                  "Highest",
                  "Last Attempt",
                  "Performance",
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
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                        {student.name
                          .split(" ")
                          .map(
                            (part) =>
                              part[0]
                          )
                          .join("")}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {student.testsAttempted}
                  </td>

                  <td className="px-4 py-4 text-sm text-emerald-600">
                    {student.passed}
                  </td>

                  <td className="px-4 py-4 text-sm text-red-500">
                    {student.failed}
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-slate-700">
                    {student.average}%
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-indigo-600">
                    {student.highest}%
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {student.lastAttempt}
                  </td>

                  <td className="px-4 py-4">
                    <Badge variant="success">
                      {student.performance}
                    </Badge>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/users/${student.id}`
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
    </AdminPage>
  );
}