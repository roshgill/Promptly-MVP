"use client";

import { motion } from "framer-motion";
import { Target, Puzzle, TrendingUp } from "lucide-react";

const benefits = [
  {
    Icon: Target,
    title: "Precision Targeting",
    description: "Reach the exact conversations that matter with AI-powered contextual understanding.",
  },
  {
    Icon: Puzzle,
    title: "Seamless Integration",
    description: "Natural ad placement that enhances rather than interrupts user experience.",
  },
  {
    Icon: TrendingUp,
    title: "Proven ROI",
    description: "Average 50% increase in CTR through intelligent placement and targeting.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-xl text-muted-foreground">
            Transform your advertising with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const { Icon } = benefit;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-card/50 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-8 rounded-lg border bg-card/50 backdrop-blur-sm space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.2 + 0.3
                    }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-center">{benefit.title}</h3>
                  <p className="text-muted-foreground text-center">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}