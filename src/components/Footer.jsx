import { BookOpen } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

        <div className="md:col-span-2">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <BookOpen size={20} />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              AI StudyMate
            </h2>

          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            Your intelligent companion for smarter learning, better
            organization, and successful placement preparation.
          </p>

        </div>

        <div>

          <h3 className="font-bold text-slate-900">
            Platform
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">

            <a href="#home" className="block hover:text-indigo-600">
              Home
            </a>

            <a href="#features" className="block hover:text-indigo-600">
              Features
            </a>

            <a href="#about" className="block hover:text-indigo-600">
              About
            </a>

            <a href="#how-it-works" className="block hover:text-indigo-600">
              How It Works
            </a>

          </div>

        </div>

        <div>

          <h3 className="font-bold text-slate-900">
            Legal
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500">

            <a href="#" className="block hover:text-indigo-600">
              Contact
            </a>

            <a href="#" className="block hover:text-indigo-600">
              Privacy Policy
            </a>

            <a href="#" className="block hover:text-indigo-600">
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-100">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <p className="text-center text-sm text-slate-500">
            © 2026 AI StudyMate. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;