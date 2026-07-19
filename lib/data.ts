export const site = {
  name: "Kris Keshav",
  tagline:
    "Aspiring Software engineer building toward DSA, system design, and exploring distributed infrastructure — learning in public.",
  location: "Roorkee, India",
  email: "kris_k@ee.iitr.ac.in",
  phone: "+91-7764951720",
  bio: "I am a B.Tech student in Electrical Engineering at IIT Roorkee with a strong focus on software engineering, distributed systems, and AI. I have hands-on experience building full-stack applications, designing robust APIs, and implementing physics-informed machine learning models. I enjoy competitive programming and tackling complex system design challenges.",
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
  hash: string;
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
      "Incorporated authentication, agents integration with multi-portal UI replacing manual spreadsheet tracking.",
      "Also developed a Custom Multi-Lingual translator from scratch with dictionaries containing 34000+ words.",
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
      "Built an OpenEnv-based cyber-physical security framework for detecting and classifying False Data Injection (FDI) attacks on SRF-PLL controlled grid-connected inverters.",
      "Combined physics-informed anomaly detection, heuristic reasoning, and LLM (Qwen) assisted decision making.",
      "Evaluated attack detection across sinusoidal, ramp, pulse, and stealthy attack scenarios, achieving 99.0% detection score and 87.2% multi-attack classification score.",
    ],
    tags: ["Python", "FastAPI", "Docker", "OpenEnv"],
    github: "https://github.com/KrisKeshav/PLL-Cyberattack-Detection-OpenEnv",
  },
  {
    name: "Credit Card Default Prediction",
    dates: "May 2025 – Jun 2025",
    description:
      "Credit risk classification model optimizing F2-score for high-recall decisions.",
    bullets: [
      "Built a credit risk classification model optimizing F2-score for high-recall decisions.",
      "Handled class imbalance using SMOTE and achieved F2-score of 0.60 with tuned LightGBM.",
    ],
    tags: ["LightGBM", "SMOTE", "Python"],
    github: "https://github.com/KrisKeshav/Credit-Card-Default-Prediction-using-Classification-and-Risk-Based-Techniques",
  },
  {
    name: "Smart Vision Quality Control System",
    dates: "Oct 2024 – Dec 2024",
    description:
      "AI-based computer vision system for automated product classification and defect detection.",
    bullets: [
      "Developed an AI-based computer vision system for automated product classification and defect detection.",
      "Finished 4th nationally in Flipkart GRID 6.0 with this solution.",
    ],
    tags: ["Computer Vision", "LLM Pipelines"],
    github: "https://github.com/KrisKeshav",
  },
  {
    name: "Text-to-Image Generation",
    dates: "May 2024 – Jun 2024",
    description:
      "Modular, local-inference pipeline using fine-tuned Stable Diffusion v1.5 and Hugging Face Diffusers.",
    bullets: [
      "Developed a modular, local-inference pipeline using fine-tuned Stable Diffusion v1.5 and Hugging Face Diffusers.",
      "Built an interactive Streamlit dashboard and containerized the setup using Docker for reproducible deployment across different environments.",
    ],
    tags: ["Stable Diffusion", "Hugging Face", "Docker"],
    github: "https://github.com/KrisKeshav/Text_to_Image_generator",
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
      "Designed constrained sampling with gradient-based physical corrections, enabling generation of physically consistent operating points.",
      "Achieved up to 20× faster inference compared to standard DDPM diffusion while preserving statistical fidelity across IEEE 6-, 24-, and 118-bus systems.",
    ],
    github: "https://github.com/PSquare-Lab/DDIM_OPF",
    arxiv: "https://arxiv.org/abs/2602.03020",
  },
];

export const awards: string[] = [
  "Ranked 4th in Flipkart Grid 6.0 (Team Event)",
  "East Zone Rank 4 in IQ Challenge (Kshitij 2022, IIT Kharagpur)",
  "AIR 18 in Technothlon'19 (Juniors)",
  "Global Rank 801 in Codeforces Round 1032 Div 3",
];

export const skills = {
  currentStack: ["C++", "Python", "MySQL", "Git", "GitHub"],
  tools: ["VS Code", "Google Colab", "Kaggle", "Hugging Face", "Roboflow"],
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
      "Participated in Flipkart Grid 6.0 and Srishti 2025 (1st position).",
    ],
  },
  {
    role: "Deputy Cell Secretary",
    org: "Marketing & Promotions Cell, NSS IIT Roorkee",
    dates: "Jul 2024 – Present",
    bullets: ["Managed outreach campaigns and promoted events across campus and social platforms."],
  },
];

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
  {
    slug: "custom-git-log-timeline",
    title: "Writing a custom git-log SVG timeline in React",
    date: "2026-07-18",
    excerpt:
      "How I built a visual, responsive git-branch graph for my experience list using pure SVG pathing and React state.",
  },
];
