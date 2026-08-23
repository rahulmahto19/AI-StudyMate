import { motion } from "framer-motion";
import {
  UserPlus,
  Settings2,
  Brain,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Register securely and set up your student profile.",
  },
  {
    number: "02",
    icon: Settings2,
    title: "Tell Us What You Need",
    description:
      "Choose your study goals, subjects, and learning preferences.",
  },
  {
    number: "03",
    icon: Brain,
    title: "Learn With AI",
    description:
      "Use AI chat, PDF summaries, notes, planning, and interview preparation.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Monitor your learning activities and improve your performance.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-24"
    >

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">

          <p className="font-semibold text-indigo-600">
            SIMPLE PROCESS
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900">
            How AI StudyMate Works
          </h2>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
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
                  delay: index * 0.15,
                }}
                className="relative text-center"
              >

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-200">

                  <Icon size={30} />

                </div>

                <span className="mt-5 block text-xs font-bold text-indigo-600">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(50%+50px)] top-10 hidden h-px w-[calc(100%-100px)] bg-indigo-100 md:block" />
                )}

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;