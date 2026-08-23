import { motion } from "framer-motion";
import {
  Brain,
  CalendarCheck,
  BriefcaseBusiness,
  Layers3,
} from "lucide-react";

const stats = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Learn with intelligent assistance.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Study Planning",
    description: "Organize your daily learning.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Ready",
    description: "Prepare for interviews and placements.",
  },
  {
    icon: Layers3,
    title: "One Platform",
    description: "Everything students need in one place.",
  },
];

function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white py-10">

      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{ y: -5 }}
              className="rounded-2xl p-5 transition"
            >

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={21} />
              </div>

              <h3 className="font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>

            </motion.div>
          );

        })}

      </div>

    </section>
  );
}

export default Stats;