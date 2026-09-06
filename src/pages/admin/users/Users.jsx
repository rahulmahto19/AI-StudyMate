import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   MOCK USERS
========================================================= */

const initialUsers = [
  {
    id: 1,
    name: "Rahul Mahto",
    email: "rahul@example.com",
    role: "Student",
    provider: "Google",
    status: "Active",
    joined: "12 Aug 2026",
    lastLogin: "Today",
  },
  {
    id: 2,
    name: "Aman Kumar",
    email: "aman@example.com",
    role: "Student",
    provider: "Google",
    status: "Active",
    joined: "10 Aug 2026",
    lastLogin: "Yesterday",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Student",
    provider: "Email",
    status: "Inactive",
    joined: "08 Aug 2026",
    lastLogin: "5 days ago",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@studymate.com",
    role: "Admin",
    provider: "Email",
    status: "Active",
    joined: "01 Aug 2026",
    lastLogin: "Today",
  },
];

/* =========================================================
   USERS PAGE
========================================================= */

function Users() {
  const navigate = useNavigate();

  const [users] = useState(initialUsers);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("All Roles");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  /* =======================================================
     FILTER USERS
  ======================================================= */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        user.name
          .toLowerCase()
          .includes(searchText) ||
        user.email
          .toLowerCase()
          .includes(searchText) ||
        user.provider
          .toLowerCase()
          .includes(searchText);

      const matchesRole =
        roleFilter === "All Roles" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalUsers = 1250;

  const activeUsers = 1084;

  const inactiveUsers = 166;

  const adminUsers = 8;

  /* =======================================================
     VIEW USER
  ======================================================= */

  const handleViewUser = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  return (
    <div className="w-full">

      {/* ===================================================
         PAGE HEADER
      =================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* ICON */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UsersIcon size={27} strokeWidth={2} />
          </div>

          {/* TITLE */}

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Users
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage students and administrators across StudyMate.
            </p>

          </div>

        </div>

        {/* ADD USER */}

        <button
          onClick={() =>
            alert(
              "Add User functionality will be connected to the backend later."
            )
          }
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl bg-indigo-600 px-5 py-3
            text-sm font-semibold text-white
            shadow-lg shadow-indigo-200
            transition-all duration-200
            hover:bg-indigo-700
            hover:shadow-xl
            active:scale-[0.98]
          "
        >
          <Plus size={18} />

          Add User
        </button>

      </motion.div>

      {/* ===================================================
         STAT CARDS
      =================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL USERS */}

        <StatCard
          icon={<UsersIcon size={20} />}
          title="Total Users"
          value={totalUsers.toLocaleString()}
          description="Registered users"
        />

        {/* ACTIVE USERS */}

        <StatCard
          icon={<UserCheck size={20} />}
          title="Active Users"
          value={activeUsers.toLocaleString()}
          description="Currently active"
        />

        {/* INACTIVE USERS */}

        <StatCard
          icon={<UserX size={20} />}
          title="Inactive Users"
          value={inactiveUsers.toLocaleString()}
          description="Need attention"
        />

        {/* ADMINS */}

        <StatCard
          icon={<UsersIcon size={20} />}
          title="Admins"
          value={adminUsers}
          description="System administrators"
        />

      </div>

      {/* ===================================================
         MAIN USERS CARD
      =================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
        className="
          overflow-hidden rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
        "
      >

        {/* =================================================
           TOOLBAR
        ================================================= */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users..."
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-2.5 pl-10 pr-4
                text-sm text-slate-700
                outline-none
                transition
                focus:border-indigo-400
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-100
              "
            />

          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">

            {/* FILTER BUTTON */}

            <button
              onClick={() => {
                setRoleFilter("All Roles");
                setStatusFilter("All Status");
              }}
              className="
                inline-flex items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4 py-2.5
                text-sm font-medium text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              <Filter size={17} />

              Reset
            </button>

            {/* ROLE */}

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="
                rounded-xl
                border border-slate-200
                bg-white px-4 py-2.5
                text-sm text-slate-600
                outline-none
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            >
              <option>
                All Roles
              </option>

              <option>
                Student
              </option>

              <option>
                Admin
              </option>
            </select>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                rounded-xl
                border border-slate-200
                bg-white px-4 py-2.5
                text-sm text-slate-600
                outline-none
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            >
              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* =================================================
           TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            {/* TABLE HEADER */}

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50/80">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Provider
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Last Login
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map(
                (user, index) => (

                  <motion.tr
                    key={user.id}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay:
                        index * 0.05,
                    }}
                    className="transition-colors hover:bg-slate-50"
                  >

                    {/* USER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        {/* AVATAR */}

                        <div
                          className="
                            flex h-10 w-10
                            shrink-0
                            items-center justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-indigo-500
                            to-purple-600
                            text-sm font-bold
                            text-white
                          "
                        >
                          {user.name
                            .split(" ")
                            .map(
                              (name) =>
                                name[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        {/* INFO */}

                        <div>

                          <p className="font-semibold text-slate-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex rounded-full
                          px-3 py-1
                          text-xs font-semibold
                          ${
                            user.role ===
                            "Admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-indigo-100 text-indigo-700"
                          }
                        `}
                      >
                        {user.role}
                      </span>

                    </td>

                    {/* PROVIDER */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.provider}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex items-center gap-2
                          rounded-full
                          px-3 py-1
                          text-xs font-semibold
                          ${
                            user.status ===
                            "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >

                        <span
                          className={`
                            h-1.5 w-1.5
                            rounded-full
                            ${
                              user.status ===
                              "Active"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }
                          `}
                        />

                        {user.status}

                      </span>

                    </td>

                    {/* JOINED */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.joined}
                    </td>

                    {/* LAST LOGIN */}

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.lastLogin}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            handleViewUser(
                              user
                            )
                          }
                          className="
                            rounded-lg p-2
                            text-slate-500
                            transition
                            hover:bg-indigo-50
                            hover:text-indigo-600
                          "
                          title="View User"
                        >
                          <Eye size={17} />
                        </button>

                        {/* MORE */}

                        <button
                          onClick={() =>
                            alert(
                              `More actions for ${user.name}`
                            )
                          }
                          className="
                            rounded-lg p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-800
                          "
                          title="More"
                        >
                          <MoreHorizontal
                            size={18}
                          />
                        </button>

                      </div>

                    </td>

                  </motion.tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
           EMPTY STATE
        ================================================= */}

        {filteredUsers.length === 0 && (

          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No users found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        )}

        {/* =================================================
           FOOTER
        ================================================= */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-700">
              {filteredUsers.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-slate-700">
              {totalUsers.toLocaleString()}
            </span>{" "}

            users

          </p>

          <div className="flex gap-2">

            <button
              disabled
              className="
                rounded-lg
                border border-slate-200
                px-3 py-2
                text-sm text-slate-400
                disabled:cursor-not-allowed
              "
            >
              Previous
            </button>

            <button
              className="
                rounded-lg
                bg-indigo-600
                px-3 py-2
                text-sm font-medium
                text-white
              "
            >
              1
            </button>

            <button
              className="
                rounded-lg
                border border-slate-200
                px-3 py-2
                text-sm text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              2
            </button>

            <button
              className="
                rounded-lg
                border border-slate-200
                px-3 py-2
                text-sm text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              Next
            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="mb-4 flex items-center justify-between">

        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-indigo-50
            text-indigo-600
          "
        >
          {icon}
        </div>

      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </motion.div>
  );
}

export default Users;