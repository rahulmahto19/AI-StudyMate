import {
  Bell,
  Database,
  Lock,
  Palette,
  Save,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  AdminPage,
  PageHeader,
  Card,
  Button,
  Badge,
} from "../../../components/admin/AdminUI";

export default function Settings() {
  const [settings, setSettings] =
    useState({
      emailNotifications: true,
      pushNotifications: true,
      testNotifications: true,
      maintenanceMode: false,
      allowStudentRegistration: true,
      showLeaderboard: true,
    });

  const toggle = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <AdminPage>
      <PageHeader
        title="Settings"
        description="Configure admin preferences and platform behavior."
        icon={SlidersHorizontal}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Notification Settings"
          description="Control how administrators receive alerts."
        >
          <div className="space-y-3">
            <Setting
              icon={Bell}
              title="Email Notifications"
              description="Receive important platform alerts by email."
              checked={
                settings.emailNotifications
              }
              onChange={() =>
                toggle(
                  "emailNotifications"
                )
              }
            />

            <Setting
              icon={Bell}
              title="Push Notifications"
              description="Receive real-time browser notifications."
              checked={
                settings.pushNotifications
              }
              onChange={() =>
                toggle(
                  "pushNotifications"
                )
              }
            />

            <Setting
              icon={ShieldCheck}
              title="Test Notifications"
              description="Get notified about important test activity."
              checked={
                settings.testNotifications
              }
              onChange={() =>
                toggle(
                  "testNotifications"
                )
              }
            />
          </div>
        </Card>

        <Card
          title="Platform Settings"
          description="Manage core StudyMate platform behavior."
        >
          <div className="space-y-3">
            <Setting
              icon={Database}
              title="Student Registration"
              description="Allow new students to register."
              checked={
                settings.allowStudentRegistration
              }
              onChange={() =>
                toggle(
                  "allowStudentRegistration"
                )
              }
            />

            <Setting
              icon={SlidersHorizontal}
              title="Leaderboard"
              description="Show student performance leaderboard."
              checked={
                settings.showLeaderboard
              }
              onChange={() =>
                toggle(
                  "showLeaderboard"
                )
              }
            />

            <Setting
              icon={Lock}
              title="Maintenance Mode"
              description="Temporarily restrict access to the platform."
              checked={
                settings.maintenanceMode
              }
              onChange={() =>
                toggle(
                  "maintenanceMode"
                )
              }
              danger
            />
          </div>
        </Card>

        <Card
          title="Security"
          description="Administrative security information."
        >
          <div className="space-y-4">
            <SecurityRow
              title="Admin Authentication"
              status="Protected"
            />

            <SecurityRow
              title="Firebase Authentication"
              status="Connected"
            />

            <SecurityRow
              title="Database"
              status="MongoDB Atlas"
            />

            <SecurityRow
              title="Session Security"
              status="Enabled"
            />
          </div>
        </Card>

        <Card
          title="Appearance"
          description="Admin interface preferences."
        >
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-4 text-left">
              <div className="h-16 rounded-xl bg-white shadow-sm" />

              <p className="mt-3 text-sm font-semibold text-slate-800">
                Light
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Current theme
              </p>
            </button>

            <button className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <div className="h-16 rounded-xl bg-slate-900" />

              <p className="mt-3 text-sm font-semibold text-slate-800">
                Dark
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Coming later
              </p>
            </button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button icon={Save}>
          Save Settings
        </Button>
      </div>
    </AdminPage>
  );
}

function Setting({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
  danger,
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-4 text-left transition hover:bg-slate-50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          danger
            ? "bg-red-50 text-red-600"
            : "bg-indigo-50 text-indigo-600"
        }`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? danger
              ? "bg-red-500"
              : "bg-indigo-600"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function SecurityRow({
  title,
  status,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
      <span className="text-sm text-slate-600">
        {title}
      </span>

      <Badge variant="success">
        {status}
      </Badge>
    </div>
  );
}