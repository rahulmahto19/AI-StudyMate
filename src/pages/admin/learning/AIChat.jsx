import {
  Bot,
  Clock3,
  MessageSquare,
  Search,
  Users,
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
} from "../../../components/admin/AdminUI";

import {
  chatSessions,
} from "../../../data/adminMockData";

export default function AIChat() {
  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const filtered = useMemo(() => {
    return chatSessions.filter(
      (session) =>
        session.student
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        session.topic
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <AdminPage>
      <PageHeader
        title="AI Chat"
        description="Monitor student AI learning conversations and usage."
        icon={Bot}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Sessions"
          value="5,430"
          icon={MessageSquare}
          iconClass="bg-purple-50 text-purple-600"
          trend={18.3}
          trendLabel="this month"
        />

        <StatCard
          title="Active Students"
          value="684"
          icon={Users}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Avg. Duration"
          value="16 min"
          icon={Clock3}
          iconClass="bg-blue-50 text-blue-600"
        />
      </div>

      <Card>
        <div className="mb-5">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search student or topic..."
          />
        </div>

        <div className="space-y-3">
          {filtered.map((session) => (
            <button
              key={session.id}
              onClick={() =>
                setSelected(session)
              }
              className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-indigo-100 hover:bg-indigo-50/30"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MessageSquare size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {session.student}
                </p>

                <p className="mt-1 text-xs text-indigo-600">
                  {session.topic}
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-slate-700">
                  {session.messages} messages
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  {session.duration}
                </p>
              </div>

              <Badge variant="success">
                Active
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Chat Session Details"
        description="Read-only mock session information."
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <MiniStat
                label="Student"
                value={selected.student}
              />

              <MiniStat
                label="Topic"
                value={selected.topic}
              />

              <MiniStat
                label="Messages"
                value={selected.messages}
              />

              <MiniStat
                label="Duration"
                value={selected.duration}
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Conversation Preview
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                  Student: Can you explain React Hooks?
                </div>

                <div className="ml-6 rounded-xl bg-indigo-600 p-3 text-sm text-white">
                  AI: Hooks allow functional components to use state and other React features.
                </div>

                <div className="rounded-xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                  Student: What is the difference between useState and useEffect?
                </div>
              </div>
            </div>

            <div className="flex justify-end">
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
    </AdminPage>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}