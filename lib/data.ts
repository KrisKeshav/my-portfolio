// All portfolio content lives here as typed data — "content as code".
// Edit this file to update what appears on the site; components (built
// in later days) will just read from these exports.

export const site = {
  name: "Kris Keshav",
  tagline:
    "Software engineer building toward DSA, system design, and distributed infrastructure — learning in public.",
  location: "Roorkee, India",
  // NOTE: verify this — the resume PDF extracted this with a stray space
  // ("kris k@ee.iitr.ac.in"), likely meant to be kris_k@ee.iitr.ac.in
  email: "kris_k@ee.iitr.ac.in",
  phone: "+91-7764951720",
};

export const links = {
  github: "https://github.com/KrisKeshav",
  githubUsername: "KrisKeshav",
  linkedin: "https://www.linkedin.com/in/kris-keshav-780b99281",
  codeforces: "https://codeforces.com/profile/Kris_k19",
};

export type Education = {
  institution: string;
  detail: string;
  dates: string;
};

export const education: Education[] = [
  {
    institution: "Indian Institute of Technology Roorkee",
    detail: "B.Tech in Electrical Engineering (CGPA: 8.15)",
    dates: "2023 – Present",
  },
  {
    institution: "D.A.V Public School, Patna (CBSE)",
    detail: "Intermediate (Class XII) — 95.80%",
    dates: "2022",
  },
  {
    institution: "D.A.V Public School, Patna (CBSE)",
    detail: "Matriculate (Class X) — 97.40%",
    dates: "2020",
  },
];

export type Experience = {
  hash: string; // fake short commit hash, purely cosmetic for the git-log UI
  role: string;
  org: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    hash: "a1c3f9d",
    role: "Software Engineering Intern",
    org: "Accenture",
    location: "Bengaluru, India",
    dates: "May 2026 – Jul 2026",
    bullets: [
      "Reduced manual PMO effort by automating resource tracking, allocation, and escalation workflows end-to-end.",
      "Incorporated authentication and agent integration with a multi-portal UI, replacing manual spreadsheet tracking.",
      "Developed a custom multi-lingual translator from scratch with dictionaries containing 10,000+ words.",
    ],
  },
];

export type Project = {
  name: string;
  dates?: string;
  description: string;
  bullets: string[];
  tags: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    name: "AI-Driven Cyberattack Detection for SRF-PLL Systems",
    description:
      "OpenEnv-based cyber-physical security framework for detecting and classifying False Data Injection (FDI) attacks on SRF-PLL controlled grid-connected inverters.",
    bullets: [
      "Combined physics-informed anomaly detection, heuristic reasoning, and LLM (Qwen) assisted decision making.",
      "Evaluated detection across sinusoidal, ramp, pulse, and stealthy attack scenarios — 99.0% detection score and 87.2% multi-attack classification score.",
    ],
    tags: ["Python", "FastAPI", "Docker", "OpenEnv"],
    github: "", // add your repo link
  },
  {
    name: "Credit Card Default Prediction",
    dates: "May 2025 – Jun 2025",
    description:
      "Credit risk classification model optimizing F2-score for high-recall decisions.",
    bullets: [
      "Handled class imbalance using SMOTE and achieved an F2-score of 0.60 with tuned LightGBM.",
    ],
    tags: ["LightGBM", "SMOTE", "Python"],
    github: "",
  },
  {
    name: "Smart Vision Quality Control System",
    dates: "Oct 2024 – Dec 2024",
    description:
      "AI-based computer vision system for automated product classification and defect detection.",
    bullets: ["Finished 4th nationally in Flipkart GRID 6.0 with this solution."],
    tags: ["Computer Vision", "LLM Pipelines"],
    github: "",
  },
];

export type Publication = {
  title: string;
  venue: string;
  description: string;
  bullets: string[];
  github?: string;
  arxiv?: string;
};

export const publications: Publication[] = [
  {
    title: "Fast Diffusion with Physics-Correction for ACOPF",
    venue: "Accepted at IEEE SEFET 2026",
    description:
      "Co-authored a physics-guided diffusion framework using DDIM for scalable ACOPF synthetic data generation.",
    bullets: [
      "Designed constrained sampling with gradient-based physical corrections for physically consistent operating points.",
      "Up to 20× faster inference than standard DDPM diffusion while preserving statistical fidelity across IEEE 6-, 24-, and 118-bus systems.",
    ],
    github: "", // add your repo link
    arxiv: "", // add your arXiv link
  },
];

export const awards: string[] = [
  "Ranked 4th in Flipkart Grid 6.0 (Team Event)",
  "East Zone Rank 4 in IQ Challenge (Kshitij 2022, IIT Kharagpur)",
  "AIR 18 in Technothlon'19 (Juniors)",
];

export const skills = {
  currentStack: ["C++", "Python", "MySQL", "Git", "GitHub"],
  tools: ["VS Code", "Google Colab", "Kaggle", "Hugging Face", "Roboflow"],
  // the tracks you're deliberately building up per your learning plan
  highPriority: ["Data Structures & Algorithms", "System Design", "SQL"],
  differentiator: ["Kafka", "Kubernetes", "Rust"],
};

export const competitiveProgramming = {
  platform: "Codeforces",
  handle: "Kris_k19",
  maxRating: 1532,
  rank: "Specialist",
  problemsSolved: "800+",
};

export type Position = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
};

export const positions: Position[] = [
  {
    role: "Member",
    org: "Models and Robotics Section (MaRS), IIT Roorkee",
    dates: "Mar 2024 – Present",
    bullets: [
      "Worked on AI/ML robotics projects and contributed to model deployment and testing.",
      "Participated in Flipkart Grid 6.0 (4th position) and Srishti 2025 (1st position).",
    ],
  },
  {
    role: "Deputy Cell Secretary",
    org: "Marketing & Promotions Cell, NSS IIT Roorkee",
    dates: "Jul 2024 – Present",
    bullets: ["Managed outreach campaigns and promoted events across campus and social platforms."],
  },
];

// Blog posts will move to MDX files once we set that up (Day 11) —
// this array is just a placeholder so the homepage has something to render.
export type BlogPostPreview = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export const blogPosts: BlogPostPreview[] = [
  {
    slug: "day-1-scaffold",
    title: "Day 1 — scaffolding this site instead of a scratch repo",
    date: "2026-07-16",
    excerpt:
      "Why I'm building my portfolio as the learning project for the next 30 days, and the stack decisions behind it.",
  },
];
