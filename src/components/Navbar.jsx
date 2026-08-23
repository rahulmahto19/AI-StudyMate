import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200">

            <BookOpen size={22} />

            <Sparkles
              size={12}
              className="absolute -right-1 -top-1"
            />

          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              AI StudyMate
            </h1>

            <p className="text-xs text-slate-500">
              Learn Smarter
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            About
          </a>

        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              How It Works
            </a>

            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              About
            </a>

            <div className="flex gap-3 pt-3">

              <Link
                to="/login"
                className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="flex-1 rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white"
              >
                Register
              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;