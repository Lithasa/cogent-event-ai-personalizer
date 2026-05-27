"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Cpu,
  MapPin,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="aurora-bg fixed inset-0 -z-10" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/25">
              <Sparkles size={21} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide">Cogent Event AI</p>
              <p className="text-xs text-slate-400">Personalized conference journey</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#overview" className="transition hover:text-cyan-300">
              Overview
            </a>
            <a href="#agenda" className="transition hover:text-cyan-300">
              Agenda
            </a>
            <a href="#personalizer" className="transition hover:text-cyan-300">
              AI Personalizer
            </a>
          </div>

          <a
            href="#personalizer"
            className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Find My Session
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            <Zap size={16} />
            AI-powered supply chain event experience
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Troubled Waters:
            <span className="gradient-text block">
              Sailing with AI in Supply Chain
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A modern event experience for logistics, supply chain, finance, and
            operations leaders who want to reduce risk, improve visibility, and
            explore how AI can strengthen regional supply chains.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#personalizer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              Find My Best Session <ArrowRight size={18} />
            </a>

            <a
              href="#agenda"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-bold text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-200"
            >
              Explore Agenda
            </a>
          </div>

          <div id="overview" className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CalendarDays,
                label: "Date",
                value: "13 Nov 2024",
              },
              {
                icon: Clock3,
                label: "Time",
                value: "09:30 AM - 01:00 PM",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Marriott Resort, The Palm",
              },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-3xl p-5">
                <item.icon className="mb-4 text-cyan-300" size={23} />
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-card relative rounded-[2rem] p-6"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  Smart Routing Preview
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  From visitor interest to matched agenda session
                </h2>
              </div>

              <Network className="text-purple-300" size={34} />
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Cpu,
                  title: "Visitor shares challenge",
                  text: "The form collects name, email, and professional focus.",
                },
                {
                  icon: Route,
                  title: "Backend reads agenda.txt",
                  text: "FastAPI will compare the visitor input with real agenda sessions.",
                },
                {
                  icon: ShieldCheck,
                  title: "LLM creates safe invitation",
                  text: "The prompt will only use matched agenda data and avoid fake details.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                    <step.icon size={20} />
                  </div>

                  <div>
                    <p className="font-bold">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm font-semibold text-cyan-200">
                Next build step
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                We will add the interactive agenda and AI personalizer form next,
                then connect everything to the Python FastAPI backend.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}