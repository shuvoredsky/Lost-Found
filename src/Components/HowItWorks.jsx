import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-primary mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <motion.p
          className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Easily find or report lost items in just a few steps. Help reunite
          people with their lost belongings.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              emoji: "📝",
              title: "1. Post an Item",
              description:
                "Report a lost or found item by filling out a quick form with images and details.",
            },
            {
              emoji: "🔎",
              title: "2. Search Items",
              description:
                "Browse or search the list of reported items using filters and keywords.",
            },
            {
              emoji: "🤝",
              title: "3. Reconnect",
              description:
                "Connect with the person who posted and return the item safely.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 bg-base-200 text-center rounded-lg shadow-md hover:shadow-lg transition"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="text-5xl mb-4">{step.emoji}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-base-content/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
