import {
  Mic,
  Play,
  Trash2,
  Volume2,
} from "lucide-react";

import { useState } from "react";

import {
  AdminPage,
  PageHeader,
  Card,
  Badge,
  StatCard,
  ConfirmDialog,
} from "../../../components/admin/AdminUI";

import {
  voiceNotes as initialVoiceNotes,
} from "../../../data/adminMockData";

export default function VoiceNotes() {
  const [voiceNotes, setVoiceNotes] =
    useState(initialVoiceNotes);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const removeVoiceNote = () => {
    if (!deleteItem) return;

    setVoiceNotes((current) =>
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
        title="Voice Notes"
        description="Monitor student voice recordings and revision material."
        icon={Mic}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Voice Notes"
          value="3,842"
          icon={Mic}
          iconClass="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Total Duration"
          value="428 hrs"
          icon={Volume2}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="This Week"
          value="184"
          icon={Mic}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <Card
        title="Recent Voice Notes"
        description="Latest student recordings"
      >
        <div className="space-y-3">
          {voiceNotes.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-purple-100 hover:bg-purple-50/20 sm:flex-row sm:items-center"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Mic size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.student} • {item.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="success">
                  {item.status}
                </Badge>

                <span className="text-xs font-medium text-slate-500">
                  {item.duration}
                </span>

                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100">
                  <Play size={16} fill="currentColor" />
                </button>

                <button
                  onClick={() =>
                    setDeleteItem(item)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={removeVoiceNote}
        title="Delete voice note?"
        description="This removes the selected recording from the mock dataset."
        confirmText="Delete"
      />
    </AdminPage>
  );
}