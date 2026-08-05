import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kris-keshav.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kris-keshav.vercel.app/blog/day-1-scaffold",
      lastModified: new Date("2026-07-16"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://kris-keshav.vercel.app/blog/custom-git-log-timeline",
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
