import {
  Camera,
  Mail,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

import {
  AdminPage,
  PageHeader,
  Card,
  Button,
  Badge,
} from "../../../components/admin/AdminUI";

export default function Profile() {
  return (
    <AdminPage>
      <PageHeader
        title="Admin Profile"
        description="Manage your administrator account information."
        icon={UserCircle}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100 text-2xl font-bold text-indigo-700">
                A
              </div>

              <button className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-md ring-1 ring-slate-100">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Admin
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Administrator
            </p>

            <Badge
              variant="success"
            >
              Active
            </Badge>

            <div className="mt-6 w-full space-y-3 text-left">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <Mail
                  size={16}
                  className="text-indigo-500"
                />

                <div>
                  <p className="text-[10px] text-slate-400">
                    Email
                  </p>

                  <p className="text-xs font-medium text-slate-700">
                    admin@aistudymate.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                <div>
                  <p className="text-[10px] text-slate-400">
                    Role
                  </p>

                  <p className="text-xs font-medium text-slate-700">
                    Super Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Personal Information"
          description="Update your administrator profile."
          className="xl:col-span-2"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="First Name"
              value="Admin"
            />

            <Field
              label="Last Name"
              value="User"
            />

            <Field
              label="Email"
              value="admin@aistudymate.com"
              type="email"
            />

            <Field
              label="Phone"
              value="+91 98765 43210"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </AdminPage>
  );
}

function Field({
  label,
  value,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
      />
    </div>
  );
}