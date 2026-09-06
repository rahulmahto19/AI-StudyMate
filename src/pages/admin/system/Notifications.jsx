import {
  Bell,
  CheckCircle2,
  Clock3,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  AdminPage,
  PageHeader,
  Card,
  Badge,
  Button,
  Modal,
  StatCard,
  ConfirmDialog,
  Select,
} from "../../../components/admin/AdminUI";

import {
  notifications as initialNotifications,
} from "../../../data/adminMockData";

export default function Notifications() {
  const [
    notifications,
    setNotifications,
  ] = useState(initialNotifications);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [deleteItem, setDeleteItem] =
    useState(null);

  const [form, setForm] =
    useState({
      title: "",
      message: "",
      audience: "All Students",
      priority: "Medium",
      status: "Draft",
    });

  const createNotification = (e) => {
    e.preventDefault();

    const item = {
      id: `NOT${Date.now()}`,
      ...form,
      date: "Just now",
    };

    setNotifications((current) => [
      item,
      ...current,
    ]);

    setForm({
      title: "",
      message: "",
      audience: "All Students",
      priority: "Medium",
      status: "Draft",
    });

    setCreateOpen(false);
  };

  const removeNotification = () => {
    if (!deleteItem) return;

    setNotifications((current) =>
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
        title="Notifications"
        description="Create and manage announcements for students and users."
        icon={Bell}
        action={
          <Button
            icon={Plus}
            onClick={() =>
              setCreateOpen(true)
            }
          >
            Create Notification
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total"
          value="38"
          icon={Bell}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Unread"
          value="12"
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Scheduled"
          value="6"
          icon={Send}
          iconClass="bg-purple-50 text-purple-600"
        />
      </div>

      <Card>
        <div className="space-y-3">
          {notifications.map(
            (notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-100 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Bell size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-800">
                        {notification.title}
                      </h3>

                      <Badge
                        variant={
                          notification.priority ===
                          "High"
                            ? "danger"
                            : notification.priority ===
                              "Medium"
                            ? "warning"
                            : "default"
                        }
                      >
                        {notification.priority}
                      </Badge>

                      <Badge
                        variant={
                          notification.status ===
                          "Sent"
                            ? "success"
                            : "info"
                        }
                      >
                        {notification.status}
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>
                        Audience:{" "}
                        <strong className="text-slate-600">
                          {notification.audience}
                        </strong>
                      </span>

                      <span>
                        {notification.date}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setDeleteItem(
                        notification
                      )
                    }
                    className="self-start rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </Card>

      <Modal
        open={createOpen}
        onClose={() =>
          setCreateOpen(false)
        }
        title="Create Notification"
        description="Create an announcement for your users."
      >
        <form
          onSubmit={createNotification}
          className="space-y-4"
        >
          <Field
            label="Title"
            value={form.title}
            onChange={(value) =>
              setForm({
                ...form,
                title: value,
              })
            }
          />

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Message
            </label>

            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message:
                    e.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <Select
            value={form.audience}
            onChange={(value) =>
              setForm({
                ...form,
                audience: value,
              })
            }
            options={[
              {
                value: "All Students",
                label: "All Students",
              },
              {
                value: "Active Students",
                label: "Active Students",
              },
              {
                value: "All Users",
                label: "All Users",
              },
            ]}
          />

          <Select
            value={form.priority}
            onChange={(value) =>
              setForm({
                ...form,
                priority: value,
              })
            }
            options={[
              {
                value: "Low",
                label: "Low",
              },
              {
                value: "Medium",
                label: "Medium",
              },
              {
                value: "High",
                label: "High",
              },
            ]}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() =>
                setCreateOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              icon={CheckCircle2}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={removeNotification}
        title="Delete notification?"
        description="The notification will be removed from the current mock dataset."
        confirmText="Delete"
      />
    </AdminPage>
  );
}

function Field({
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
        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
      />
    </div>
  );
}