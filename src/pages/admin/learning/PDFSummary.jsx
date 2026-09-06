import {
  Download,
  FileText,
  Search,
  Trash2,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  AdminPage,
  PageHeader,
  Card,
  SearchInput,
  Badge,
  StatCard,
  ConfirmDialog,
  Button,
} from "../../../components/admin/AdminUI";

import {
  pdfRecords as initialRecords,
} from "../../../data/adminMockData";

export default function PDFSummary() {
  const [records, setRecords] =
    useState(initialRecords);

  const [search, setSearch] =
    useState("");

  const [deleteItem, setDeleteItem] =
    useState(null);

  const filtered = useMemo(
    () =>
      records.filter(
        (item) =>
          item.student
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.fileName
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [records, search]
  );

  const removeRecord = () => {
    if (!deleteItem) return;

    setRecords((current) =>
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
        title="PDF Summary"
        description="Monitor generated PDF summaries and processing activity."
        icon={FileText}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Summaries"
          value="2,180"
          icon={FileText}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Completed"
          value="2,142"
          icon={FileText}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Processing"
          value="38"
          icon={FileText}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      <Card>
        <div className="mb-5">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search student or file..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Student",
                  "File",
                  "Pages",
                  "Size",
                  "Status",
                  "Created",
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
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                    {item.student}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <FileText size={15} />
                      </div>

                      <span className="text-sm text-slate-600">
                        {item.fileName}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {item.pages}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {item.size}
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        item.status ===
                        "Completed"
                          ? "success"
                          : "warning"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {item.created}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600">
                        <Download size={16} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteItem(item)
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
        onConfirm={removeRecord}
        title="Delete PDF record?"
        description="This will remove the record from the mock admin dataset."
        confirmText="Delete"
      />
    </AdminPage>
  );
}