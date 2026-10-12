"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "BIOS POST... OK", delay: 0 },
  { text: "Loading kernel modules...", delay: 200 },
  { text: "Initializing network stack ██████████ done", delay: 400 },
  { text: "Mounting /dev/portfolio...", delay: 650 },
  { text: "Resolving dependencies: react@18, next@14, framer-motion...", delay: 900 },
  { text: "Compiling TypeScript ━━━━━━━━━━━━━━━━━━━━ 100%", delay: 1200 },
  { text: "Starting dev server on port 3000...", delay: 1500 },
  { text: "", delay: 1700 },
  { text: "██ portfolio.kris-keshav ready ██", accent: true, delay: 1800 },
];

// The overlay is server-rendered so there's no flash of the page before it appears.
// The inline script in layout.tsx sets html[data-booted] before paint for repeat
// visits / reduced-motion users, and globals.css hides the overlay in that case.
export default function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<typeof BOOT_LINES>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-booted")) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      timers.forEach(clearTimeout);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      document.body.style.overflow = "";
      setVisible(false);
      timers.push(setTimeout(() => setDone(true), 500));
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };

    BOOT_LINES.forEach((line) => {
      timers.push(setTimeout(() => setLines((prev) => [...prev, line]), line.delay));
    });
    timers.push(setTimeout(finish, BOOT_LINES[BOOT_LINES.length - 1].delay + 600));

    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={false}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="boot-overlay fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#0A0C10" }}
          aria-hidden="true"
        >
          <div className="w-full max-w-xl px-6 font-mono text-sm leading-7 select-none">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={line.accent ? "text-[#4DD8D3] font-bold mt-1" : "text-[#8A93A0]"}
              >
                {line.text && (
                  <span className="text-[#4A5261] mr-2 select-none">›</span>
                )}
                {line.text}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-2 h-4 bg-[#F0A84E] mt-2"
            />
            <div className="mt-6 text-[11px] text-[#4A5261]">tap or press any key to skip</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
