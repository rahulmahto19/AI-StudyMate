import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="px-6 py-24">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-8 py-16 text-center text-white shadow-2xl shadow-indigo-200 md:px-16"
      >

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Sparkles size={28} />
        </div>

        <h2 className="mt-6 text-4xl font-black md:text-5xl">
          Ready to Study Smarter?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-indigo-100">
          Join AI StudyMate and bring your learning, planning, notes, and
          placement preparation into one intelligent platform.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-indigo-700 transition hover:-translate-y-1"
          >
            Get Started Free

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </Link>

          <Link
            to="/login"
            className="font-semibold text-white transition hover:text-indigo-200"
          >
            Already have an account? Login
          </Link>

        </div>

      </motion.div>

    </section>
  );
}

export default CTA;