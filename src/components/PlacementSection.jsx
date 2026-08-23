import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  MessageSquareText,
  FileUser,
} from "lucide-react";

const placementItems = [
  {
    icon: BrainCircuit,
    title: "Aptitude Practice",
  },
  {
    icon: Code2,
    title: "Technical Interview",
  },
  {
    icon: MessageSquareText,
    title: "HR Interview",
  },
  {
    icon: FileUser,
    title: "Resume-Based Questions",
  },
];

function PlacementSection() {
  return (
    <section className="bg-indigo-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            <p className="font-semibold text-indigo-600">
              CAREER PREPARATION
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              Prepare for Your Next Opportunity
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Practice aptitude, technical, and HR questions and use your
              resume to simulate personalized interview sessions.
            </p>

            <button
              className="mt-8 rounded-2xl bg-indigo-600 px-6 py-3.5
              font-semibold text-white shadow-lg shadow-indigo-200
              transition hover:-translate-y-1 hover:bg-indigo-700"
            >
              Start Placement Preparation
            </button>

          </div>

          {/* Right Cards */}
          <div className="grid gap-4 sm:grid-cols-2">

            {placementItems.map((item, index) => {

              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-indigo-100
                  bg-white p-7 shadow-sm transition hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center
                  rounded-2xl bg-indigo-50 text-indigo-600">

                    <Icon size={23} />

                  </div>

                  <h3 className="mt-6 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Practice with AI-powered preparation tools.
                  </p>

                </motion.div>
              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}

export default PlacementSection;