"use client";

import { useEffect } from "react";

// Renders nothing. Fires one POST to /api/track-visit the first time a
// visitor loads any page in a given browser session (sessionStorage
// dedupes it, so refreshes and page navigation don't spam you with
// repeat emails). Mount this once in app/layout.tsx.
export default function VisitTracker() {
  useEffect(() => {
    const key = "portfolio-visit-pinged";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {
      // silent — a visitor should never see or be blocked by this
    });
  }, []);

  return null;
}
