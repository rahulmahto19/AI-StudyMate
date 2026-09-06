import {
  Eye,
  FileText,
  NotebookPen,
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
  Modal,
  Button,
  ConfirmDialog,
} from "../../../components/admin/AdminUI";

import {
  notes as initialNotes,
} from "../../../data/adminMockData";

export default function Notes() {
  const [notes, setNotes] =
    useState(initialNotes);

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const filtered = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          note.student
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          note.category
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [notes, search]
  );

  const removeNote = () => {
    if (!deleteItem) return;

    setNotes((current) =>
      current.filter(
        (note) =>
          note.id !== deleteItem.id
      )
    );

    setDeleteItem(null);
  };

  return (
    <AdminPage>
      <PageHeader
        title="Notes"
        description="Manage student-created study notes."
        icon={NotebookPen}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Notes"
          value="8,420"
          icon={NotebookPen}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Created This Week"
          value="386"
          icon={FileText}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Active Writers"
          value="742"
          icon={NotebookPen}
          iconClass="bg-purple-50 text-purple-600"
        />
      </div>

      <Card>
        <div className="mb-5">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search notes..."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg hover:shadow-slate-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <NotebookPen size={18} />
                </div>

                <Badge variant="indigo">
                  {note.category}
                </Badge>
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {note.title}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {note.student}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[11px] text-slate-400">
                    Updated
                  </p>

                  <p className="text-xs font-medium text-slate-600">
                    {note.updated}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      setSelected(note)
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() =>
                      setDeleteItem(note)
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
        title={selected?.title}
        description={selected?.student}
      >
        {selected && (
          <div>
            <div className="mb-4 flex gap-2">
              <Badge variant="indigo">
                {selected.category}
              </Badge>

              <Badge>
                {selected.words} words
              </Badge>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              This is a preview of the student's note content. In the backend-integrated version, the complete note content will be loaded dynamically.
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setSelected(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={removeNote}
        title="Delete note?"
        description="The selected note will be removed from the current mock dataset."
        confirmText="Delete Note"
      />
    </AdminPage>
  );
}