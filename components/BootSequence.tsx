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

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<typeof BOOT_LINES>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setDone(true);
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
    });

    const total = BOOT_LINES[BOOT_LINES.length - 1].delay + 600;
    const timer = setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setVisible(false);
      document.body.style.overflow = "";
      setTimeout(() => setDone(true), 500);
    }, total);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#0A0C10" }}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
