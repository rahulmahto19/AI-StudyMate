import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  NotebookPen,
  Mic,
  CalendarDays,
  Briefcase,
  UserRoundCheck,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "AI Chat",
    description:
      "Ask questions and get AI-powered explanations for your studies.",
  },
  {
    icon: FileText,
    title: "PDF Summarizer",
    description:
      "Upload study PDFs and get concise and useful summaries.",
  },
  {
    icon: NotebookPen,
    title: "Smart Notes",
    description:
      "Create, edit, organize, and manage your study notes.",
  },
  {
    icon: Mic,
    title: "Voice Notes",
    description:
      "Record and manage voice-based study notes.",
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
    description:
      "Create personalized study schedules and stay organized.",
  },
  {
    icon: Briefcase,
    title: "Placement Preparation",
    description:
      "Practice aptitude, technical, and HR interview questions.",
  },
  {
    icon: UserRoundCheck,
    title: "Resume Interview Practice",
    description:
      "Generate interview questions based on your resume.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track your study activities and learning progress.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >

          <p className="font-semibold text-indigo-600">
            POWERFUL FEATURES
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
            Everything You Need to Study Smarter
          </h2>

          <p className="mt-5 text-slate-600">
            One intelligent platform designed to simplify learning,
            organization, and career preparation.
          </p>

        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;