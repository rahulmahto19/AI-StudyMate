import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  BookOpen,
  Trash2,
  Edit3,
  X,
  Search,
  Target,
  Circle,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from "lucide-react";

/* =====================================================
   HELPER FUNCTIONS
===================================================== */

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getMonthName(date) {
  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

function isSameDate(date1, date2) {
  return formatDate(date1) === formatDate(date2);
}

function getDaysInMonth(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

function getFirstDayOfMonth(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
}

/* =====================================================
   INITIAL TASKS
===================================================== */

const initialTasks = [
  {
    id: 1,
    title: "React Hooks",
    subject: "React",
    date: "2026-08-23",
    startTime: "09:00",
    endTime: "10:30",
    priority: "High",
    completed: true,
  },

  {
    id: 2,
    title: "JavaScript Promises",
    subject: "JavaScript",
    date: "2026-08-23",
    startTime: "11:00",
    endTime: "12:00",
    priority: "Medium",
    completed: false,
  },

  {
    id: 3,
    title: "MongoDB Queries",
    subject: "MongoDB",
    date: "2026-08-24",
    startTime: "10:00",
    endTime: "11:30",
    priority: "High",
    completed: false,
  },

  {
    id: 4,
    title: "Node.js Interview Questions",
    subject: "Placement",
    date: "2026-08-25",
    startTime: "14:00",
    endTime: "15:00",
    priority: "Medium",
    completed: false,
  },

  {
    id: 5,
    title: "SQL Joins Revision",
    subject: "SQL",
    date: "2026-08-26",
    startTime: "09:30",
    endTime: "10:30",
    priority: "Low",
    completed: false,
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function StudyPlanner() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [tasks, setTasks] =
    useState(initialTasks);

  const [showModal, setShowModal] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  /* =====================================================
     FORM STATE
  ===================================================== */

  const emptyForm = {
    title: "",
    subject: "",
    date: formatDate(today),
    startTime: "09:00",
    endTime: "10:00",
    priority: "Medium",
  };

  const [form, setForm] =
    useState(emptyForm);

  /* =====================================================
     CALENDAR DAYS
  ===================================================== */

  const daysInMonth =
    getDaysInMonth(currentMonth);

  const firstDay =
    getFirstDayOfMonth(currentMonth);

  const calendarDays = [];

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    calendarDays.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push(day);
  }

  /* =====================================================
     SELECTED DATE TASKS
  ===================================================== */

  const selectedDateTasks =
    useMemo(() => {
      const date = formatDate(
        selectedDate
      );

      return tasks.filter(
        (task) => {
          const matchesDate =
            task.date === date;

          const matchesSearch =
            task.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            task.subject
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesFilter =
            filter === "All" ||
            (filter === "Completed" &&
              task.completed) ||
            (filter === "Pending" &&
              !task.completed) ||
            task.priority === filter;

          return (
            matchesDate &&
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      tasks,
      selectedDate,
      search,
      filter,
    ]);

  /* =====================================================
     TODAY TASKS
  ===================================================== */

  const todayTasks =
    tasks.filter(
      (task) =>
        task.date ===
        formatDate(today)
    );

  /* =====================================================
     STATISTICS
  ===================================================== */

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const totalTasks =
    tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  /* =====================================================
     CHANGE MONTH
  ===================================================== */

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  /* =====================================================
     SELECT CALENDAR DATE
  ===================================================== */

  const selectCalendarDate = (
    day
  ) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setSelectedDate(date);
  };

  /* =====================================================
     OPEN ADD MODAL
  ===================================================== */

  const openAddModal = () => {
    setEditingTask(null);

    setForm({
      ...emptyForm,
      date: formatDate(
        selectedDate
      ),
    });

    setShowModal(true);
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const openEditModal = (
    task
  ) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      subject: task.subject,
      date: task.date,
      startTime: task.startTime,
      endTime: task.endTime,
      priority: task.priority,
    });

    setShowModal(true);
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setForm(emptyForm);
  };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     CREATE / UPDATE TASK
  ===================================================== */

  const saveTask = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.subject.trim()
    ) {
      return;
    }

    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id ===
          editingTask.id
            ? {
                ...task,
                ...form,
              }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...form,
        completed: false,
      };

      setTasks((previous) => [
        ...previous,
        newTask,
      ]);

      setSelectedDate(
        new Date(form.date)
      );
    }

    closeModal();
  };

  /* =====================================================
     DELETE TASK
  ===================================================== */

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter(
        (task) => task.id !== id
      )
    );
  };

  /* =====================================================
     TOGGLE TASK
  ===================================================== */

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
  };

  /* =====================================================
     TASK COUNT FOR CALENDAR
  ===================================================== */

  const getTaskCount = (
    day
  ) => {
    const date = formatDate(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      )
    );

    return tasks.filter(
      (task) => task.date === date
    ).length;
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">

              <CalendarDays size={19} />

            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              STUDY MANAGEMENT
            </p>

          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Study Planner
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Plan your study sessions, manage daily
            tasks, and stay consistent with your learning goals.
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus size={18} />
          Add Study Task
        </button>

      </motion.div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <PlannerStat
          icon={Target}
          title="Total Tasks"
          value={totalTasks}
        />

        <PlannerStat
          icon={CheckCircle2}
          title="Completed"
          value={completedTasks}
        />

        <PlannerStat
          icon={Clock}
          title="Today's Tasks"
          value={todayTasks.length}
        />

        <PlannerStat
          icon={CalendarDays}
          title="Progress"
          value={`${progress}%`}
        />

      </div>

      {/* =================================================
          PROGRESS BAR
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.15,
        }}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-bold text-slate-800">
              Your Study Progress
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Keep completing your planned sessions.
            </p>

          </div>

          <span className="text-lg font-black text-indigo-600">
            {progress}%
          </span>

        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.8,
            }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
          />

        </div>

      </motion.div>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="mt-7 grid gap-6 lg:grid-cols-5">

        {/* =================================================
            CALENDAR
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3"
        >

          {/* Calendar Header */}

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Calendar
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                {getMonthName(
                  currentMonth
                )}
              </h2>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={
                  previousMonth
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <ChevronLeft
                  size={17}
                />
              </button>

              <button
                onClick={
                  nextMonth
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <ChevronRight
                  size={17}
                />
              </button>

            </div>

          </div>

          {/* Week Days */}

          <div className="mt-6 grid grid-cols-7">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (

              <div
                key={day}
                className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400"
              >
                {day}
              </div>

            ))}

          </div>

          {/* Calendar */}

          <div className="grid grid-cols-7 gap-1">

            {calendarDays.map(
              (day, index) => {

                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[70px]"
                    />
                  );
                }

                const date =
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  );

                const selected =
                  isSameDate(
                    date,
                    selectedDate
                  );

                const isToday =
                  isSameDate(
                    date,
                    today
                  );

                const taskCount =
                  getTaskCount(day);

                return (
                  <motion.button
                    key={day}
                    whileHover={{
                      scale: 1.03,
                    }}
                    onClick={() =>
                      selectCalendarDate(
                        day
                      )
                    }
                    className={`relative min-h-[70px] rounded-xl border p-2 text-left transition ${
                      selected
                        ? "border-indigo-300 bg-indigo-50 shadow-sm"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex justify-between">

                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                          isToday
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                            : selected
                            ? "text-indigo-700"
                            : "text-slate-600"
                        }`}
                      >
                        {day}
                      </span>

                    </div>

                    {taskCount > 0 && (

                      <div className="mt-2 flex gap-1">

                        {[...Array(
                          Math.min(
                            taskCount,
                            3
                          )
                        )].map(
                          (_, i) => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                            />
                          )
                        )}

                      </div>

                    )}

                    {taskCount > 0 && (

                      <p className="mt-1 text-[9px] font-semibold text-indigo-500">
                        {taskCount}{" "}
                        {taskCount === 1
                          ? "task"
                          : "tasks"}
                      </p>

                    )}

                  </motion.button>
                );
              }
            )}

          </div>

        </motion.section>

        {/* =================================================
            DAY TASKS
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
        >

          {/* Header */}

          <div className="border-b border-slate-100 p-5">

            <div className="flex items-start justify-between gap-3">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Selected Day
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  {selectedDate.toLocaleDateString(
                    "en-US",
                    {
                      weekday:
                        "long",
                      month:
                        "short",
                      day: "numeric",
                    }
                  )}
                </h2>

              </div>

              <button
                onClick={
                  openAddModal
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                <Plus size={17} />
              </button>

            </div>

            {/* Search */}

            <div className="relative mt-4">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Filters */}

            <div className="mt-3 flex gap-2 overflow-x-auto">

              {[
                "All",
                "Pending",
                "Completed",
                "High",
                "Medium",
                "Low",
              ].map(
                (item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setFilter(
                        item
                      )
                    }
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold transition ${
                      filter === item
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {item}
                  </button>

                )
              )}

            </div>

          </div>

          {/* Task List */}

          <div className="max-h-[530px] overflow-y-auto p-4">

            {selectedDateTasks.length >
            0 ? (

              <div className="space-y-3">

                <AnimatePresence>
                  {selectedDateTasks.map(
                    (task) => (
                      <StudyTask
                        key={task.id}
                        task={task}
                        onToggle={() =>
                          toggleTask(
                            task.id
                          )
                        }
                        onEdit={() =>
                          openEditModal(
                            task
                          )
                        }
                        onDelete={() =>
                          deleteTask(
                            task.id
                          )
                        }
                      />
                    )
                  )}
                </AnimatePresence>

              </div>

            ) : (

              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">

                  <CalendarDays
                    size={25}
                  />

                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  No study tasks
                </h3>

                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                  There are no tasks planned for this date.
                </p>

                <button
                  onClick={
                    openAddModal
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700"
                >
                  <Plus size={15} />
                  Add Task
                </button>

              </div>

            )}

          </div>

        </motion.section>

      </div>

      {/* =================================================
          UPCOMING TASKS
      ================================================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Stay Consistent
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Upcoming Study Sessions
            </h2>

          </div>

          <BookOpen
            size={22}
            className="text-indigo-500"
          />

        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {tasks
            .filter(
              (task) =>
                task.date >=
                formatDate(today)
            )
            .slice(0, 4)
            .map((task) => (

              <UpcomingTask
                key={task.id}
                task={task}
              />

            ))}

        </div>

      </motion.section>

      {/* =================================================
          MODAL
      ================================================= */}

      <AnimatePresence>

        {showModal && (

          <TaskModal
            form={form}
            editingTask={
              editingTask
            }
            onChange={
              handleChange
            }
            onClose={
              closeModal
            }
            onSubmit={
              saveTask
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function PlannerStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {value}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Icon size={20} />

        </div>

      </div>

    </motion.div>
  );
}

/* =====================================================
   STUDY TASK
===================================================== */

function StudyTask({
  task,
  onToggle,
  onEdit,
  onDelete,
}) {
  const priorityStyles = {
    High: "bg-red-50 text-red-600",
    Medium:
      "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      className={`group rounded-2xl border p-4 transition ${
        task.completed
          ? "border-emerald-100 bg-emerald-50/40"
          : "border-slate-100 bg-white hover:border-indigo-100 hover:shadow-md"
      }`}
    >

      <div className="flex gap-3">

        {/* Complete Button */}

        <button
          onClick={onToggle}
          className="mt-0.5 shrink-0"
        >

          {task.completed ? (

            <CheckCircle2
              size={21}
              className="text-emerald-500"
              fill="currentColor"
              strokeWidth={1.5}
            />

          ) : (

            <Circle
              size={21}
              className="text-slate-300 transition hover:text-indigo-500"
            />

          )}

        </button>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div>

              <h3
                className={`text-sm font-bold ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }`}
              >
                {task.title}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600">
                  {task.subject}
                </span>

                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock
                    size={11}
                  />
                  {task.startTime}
                  {" - "}
                  {task.endTime}
                </span>

              </div>

            </div>

            <span
              className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                priorityStyles[
                  task.priority
                ]
              }`}
            >
              {task.priority}
            </span>

          </div>

          {/* Actions */}

          <div className="mt-3 flex items-center gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">

            <button
              onClick={onEdit}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Edit3
                size={12}
              />
              Edit
            </button>

            <button
              onClick={onDelete}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2
                size={12}
              />
              Delete
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

/* =====================================================
   UPCOMING TASK
===================================================== */

function UpcomingTask({
  task,
}) {
  const date = new Date(
    `${task.date}T00:00:00`
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40">

      <div className="flex items-center justify-between">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
          <BookOpen
            size={16}
          />
        </span>

        <span className="text-[10px] font-semibold text-slate-400">
          {date.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          )}
        </span>

      </div>

      <h3 className="mt-4 truncate text-sm font-bold text-slate-800">
        {task.title}
      </h3>

      <p className="mt-1 text-[10px] text-slate-400">
        {task.subject}
      </p>

      <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-indigo-600">
        <Clock size={11} />
        {task.startTime}
      </div>

    </div>
  );
}

/* =====================================================
   TASK MODAL
===================================================== */

function TaskModal({
  form,
  editingTask,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 p-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <CalendarDays
                  size={18}
                />

              </div>

              <h2 className="text-lg font-black text-slate-900">
                {editingTask
                  ? "Edit Study Task"
                  : "Create Study Task"}
              </h2>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Plan your next focused study session.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={onSubmit}
          className="space-y-5 p-5"
        >

          {/* Title */}

          <div>

            <label className="mb-2 block text-xs font-bold text-slate-700">
              Task Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="e.g. Learn React Hooks"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>

          {/* Subject */}

          <div>

            <label className="mb-2 block text-xs font-bold text-slate-700">
              Subject
            </label>

            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              placeholder="e.g. React"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>

          {/* Date */}

          <div>

            <label className="mb-2 block text-xs font-bold text-slate-700">
              Study Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              required
            />

          </div>

          {/* Time */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-xs font-bold text-slate-700">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={
                  form.startTime
                }
                onChange={onChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-xs font-bold text-slate-700">
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={
                  form.endTime
                }
                onChange={onChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                required
              />

            </div>

          </div>

          {/* Priority */}

          <div>

            <label className="mb-2 block text-xs font-bold text-slate-700">
              Priority
            </label>

            <div className="grid grid-cols-3 gap-2">

              {[
                "Low",
                "Medium",
                "High",
              ].map(
                (priority) => (

                  <button
                    type="button"
                    key={priority}
                    onClick={() =>
                      onChange({
                        target: {
                          name: "priority",
                          value:
                            priority,
                        },
                      })
                    }
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      form.priority ===
                      priority
                        ? priority ===
                          "High"
                          ? "border-red-200 bg-red-50 text-red-600"
                          : priority ===
                            "Medium"
                          ? "border-amber-200 bg-amber-50 text-amber-600"
                          : "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
                    }`}
                  >
                    {priority}
                  </button>

                )
              )}

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>

          </div>

        </form>

      </motion.div>

    </motion.div>
  );
}

export default StudyPlanner;