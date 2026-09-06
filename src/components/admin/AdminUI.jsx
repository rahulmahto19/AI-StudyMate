import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

/* =========================================================
   PAGE CONTAINER
========================================================= */

export function AdminPage({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   PAGE HEADER
========================================================= */

export function PageHeader({
  title,
  description,
  action,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon size={21} />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

/* =========================================================
   BUTTON
========================================================= */

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100",

    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",

    danger:
      "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",

    success:
      "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100",

    ghost:
      "text-slate-600 hover:bg-slate-100",

    dark:
      "bg-slate-900 text-white hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium transition-all
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        Icon && <Icon size={16} />
      )}

      {children}
    </motion.button>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  iconClass = "bg-indigo-50 text-indigo-600",
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
              trend >= 0
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>

          {trendLabel && (
            <span className="text-xs text-slate-400">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* =========================================================
   BADGE
========================================================= */

export function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-600",
    danger: "bg-red-50 text-red-600",
    warning: "bg-amber-50 text-amber-600",
    info: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-2.5 py-1 text-xs font-semibold
        ${variants[variant] || variants.default}
      `}
    >
      {children}
    </span>
  );
}

/* =========================================================
   SEARCH INPUT
========================================================= */

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative">
      <Search
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-10 w-full rounded-xl
          border border-slate-200
          bg-white pl-10 pr-4
          text-sm text-slate-700
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-indigo-400
          focus:ring-4 focus:ring-indigo-50
        "
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

export function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10 w-full appearance-none
          rounded-xl border border-slate-200
          bg-white px-3 pr-9
          text-sm text-slate-700
          outline-none
          focus:border-indigo-400
          focus:ring-4 focus:ring-indigo-50
        "
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

export function Card({
  title,
  description,
  action,
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl border border-slate-200
        bg-white shadow-sm
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            {title && (
              <h3 className="font-semibold text-slate-900">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-xs text-slate-400">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   TABLE
========================================================= */

export function Table({
  columns,
  data,
  emptyMessage = "No records found.",
  renderRow,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) =>
                renderRow(item, index)
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`relative z-10 w-full ${sizes[size]} overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs text-slate-400">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   CONFIRM DIALOG
========================================================= */

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  danger = true,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="text-center">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            danger
              ? "bg-red-50 text-red-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          <AlertTriangle size={22} />
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            onClick={onConfirm}
          >
            <Check size={16} />
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/* =========================================================
   PROGRESS BAR
========================================================= */

export function ProgressBar({
  value = 0,
  label,
  showValue = true,
}) {
  const percentage = Math.min(
    100,
    Math.max(0, value)
  );

  return (
    <div>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-slate-500">
              {label}
            </span>
          )}

          {showValue && (
            <span className="text-xs font-semibold text-slate-700">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7 }}
          className="h-full rounded-full bg-indigo-600"
        />
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Icon size={24} />
        </div>
      )}

      <h3 className="mt-4 font-semibold text-slate-800">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-md text-sm text-slate-400">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}