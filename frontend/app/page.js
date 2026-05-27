"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";

const detailItems = [
  {
    icon: CalendarDays,
    label: "DATE",
    value: "13th November 2024",
  },
  {
    icon: Clock3,
    label: "TIME",
    value: "09.30AM to 01.00PM",
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "Marriott Resort, The Palm",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative min-h-screen overflow-hidden">
        {/* Ship background */}
        <img
          src="/images/ship.jpg"
          alt="Container ship at sea"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] contrast-[1.08] saturate-[1.08]"
        />

        {/* Overlays */}
        <div className="hero-left-overlay absolute inset-0 z-10" />
        <div className="hero-bottom-overlay absolute inset-0 z-10" />
        <div className="hero-grid absolute inset-0 z-20" />

        {/* Globe */}
        <motion.img
          src="/images/globe.png"
          alt="Digital network globe"
          className="globe-shine pointer-events-none absolute right-[-2vw] top-1/2 z-30 hidden h-[300vh] w-[300vh] max-h-[900px] max-w-[900px] -translate-y-1/2 opacity-95 lg:block"
          animate={{ rotate: 360 }}
          transition={{
            rotate: {
              duration: 55,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />

        {/* Top brand bar on hero */}
        <header className="absolute left-0 right-0 top-0 z-40">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 lg:px-8">
            <div className="brand-pill rounded-[1.8rem] px-7 py-5">
              <p className="text-[2.35rem] font-extrabold leading-none tracking-[-0.06em] text-white">
                accel<span className="font-light text-[#88eaff]">alpha</span>
              </p>
            </div>

            <div className="brand-pill flex items-center gap-5 rounded-[1.4rem] px-6 py-5 text-base font-bold text-white">
              <span className="text-[#ff8f84]">ORACLE</span>
              <span className="h-8 w-px bg-white/20" />
              <span>Partner</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="relative z-40 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 pb-16 pt-32 lg:px-8">
          <div className="max-w-[960px]">
            <motion.p
              initial={{ opacity: 0, y: -36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-[1.25rem] font-extrabold uppercase tracking-[0.28em] text-white sm:text-[1.45rem] lg:text-[1.6rem]"
            >
              Exclusive Invitation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.12, ease: "easeOut" }}
              className="mt-6 text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3.6rem] lg:text-[4.7rem]"
            >
              Troubled Waters:
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.22, ease: "easeOut" }}
              className="hero-title-gradient mt-3 text-[1.85rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[2.3rem] lg:whitespace-nowrap lg:text-[2.9rem]"
            >
              Sailing with AI in Supply Chain
            </motion.h2>

            <div className="mt-10 flex max-w-[520px] flex-col gap-3">
              {detailItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.58,
                    delay: 0.42 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="detail-pill flex items-center gap-4 rounded-[1.5rem] px-5 py-4"
                >
                  <div className="detail-icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem]">
                    <item.icon className="text-cyan-200" size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[0.85rem] font-extrabold tracking-[0.3em] text-cyan-200/90">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[1.05rem] font-bold leading-snug text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#personalizer"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.82, ease: "easeOut" }}
              className="register-button mt-7 inline-flex items-center gap-3 rounded-full bg-[#ff4438] px-9 py-4 text-[1rem] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(255,68,56,0.34)] transition hover:-translate-y-1 hover:bg-[#ff564b]"
            >
              Register
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </div>
      </section>

      <section id="personalizer" className="bg-[#020617] px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-10 backdrop-blur-xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Next Build Section
          </p>
          <h2 className="mt-4 text-4xl font-black text-white">
            AI Personalizer + Agenda Matching Coming Next
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            After the hero is final, we will build the interactive agenda, visitor form,
            backend matching logic, invitation generation, and MCP logging flow.
          </p>
        </div>
      </section>
    </main>
  );
}