export const site = {
  name: "Kris Keshav",
  tagline:
    "Aspiring Software engineer building toward DSA, system design, and exploring distributed infrastructure — learning in public.",
  location: "Roorkee, India",
  email: "kris_k@ee.iitr.ac.in",
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
  certificateUrl?: string;
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
    certificateUrl: "/accenture-internship-certificate.pdf",
  },
];

export type Project = {
  id: string;
  name: string;
  category: "AI / ML" | "Cyber-Physical" | "Computer Vision" | "Full Stack";
  dates?: string;
  description: string;
  longDescription: string;
  bullets: string[];
  tags: string[];
  github?: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  architecture: string[];
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    id: "srf-pll-cyberattack",
    name: "AI-Driven Cyberattack Detection for SRF-PLL Systems",
    category: "Cyber-Physical",
    dates: "Jan 2025 – Mar 2025",
    description:
      "OpenEnv-based cyber-physical security framework for detecting and classifying False Data Injection (FDI) attacks on SRF-PLL controlled grid-connected inverters.",
    longDescription:
      "A comprehensive cyber-physical framework designed to protect smart power grids against stealthy False Data Injection (FDI) attacks targeting Synchronous Reference Frame Phase-Locked Loops (SRF-PLL). Integrates real-time telemetry processing with physics-based constraints and LLM-assisted decision support.",
    bullets: [
      "Engineered real-time Park transform telemetry filters and dq0 residual evaluation routines.",
      "Combined physics-informed anomaly detection, heuristic reasoning, and LLM (Qwen) assisted decision making.",
      "Evaluated attack detection across sinusoidal, ramp, pulse, and stealthy attack scenarios, achieving 99.0% detection score and 87.2% multi-attack classification score.",
    ],
    tags: ["Python", "FastAPI", "Docker", "OpenEnv", "Qwen-LLM"],
    github: "https://github.com/KrisKeshav/PLL-Cyberattack-Detection-OpenEnv",
    metrics: [
      { label: "Attack Detection Rate", value: "99.0%" },
      { label: "Classification Score", value: "87.2%" },
      { label: "Inference Latency", value: "< 15ms" },
    ],
    architecture: [
      "Inverter Telemetry (V_abc, I_abc) -> Park Transform (dq0 conversion)",
      "Physics Engine: State Estimation & Residual Calculation (e_d, e_q)",
      "Neural Anomaly Filter: OpenEnv Reinforcement Agent",
      "LLM Reasoning Layer (Qwen-2.5): Root Cause & Severity Analysis",
      "FastAPI Alert Dispatcher to Microgrid Controller",
    ],
    codeSnippet: {
      title: "detector_agent.py",
      language: "python",
      code: `def evaluate_telemetry(v_d, v_q, freq_est):
    # Physics residual calculation
    res_d = v_d - NOMINAL_VD
    res_q = v_q - NOMINAL_VQ
    anomaly_score = np.sqrt(res_d**2 + res_q**2)
    
    if anomaly_score > THRESHOLD:
        context = f"V_d: {v_d:.2f}, V_q: {v_q:.2f}, Freq: {freq_est:.2f}Hz"
        alert = qwen_reasoner.analyze(context)
        return {"status": "ATTACK_DETECTED", "score": anomaly_score, "report": alert}
    return {"status": "NORMAL", "score": anomaly_score}`,
    },
  },
  {
    id: "credit-card-default",
    name: "Credit Card Default Prediction",
    category: "AI / ML",
    dates: "May 2025 – Jun 2025",
    description:
      "Credit risk classification model optimizing F2-score for high-recall decisions.",
    longDescription:
      "An end-to-end credit risk modeling pipeline focused on minimizing costly false negatives in credit default predictions. Utilizes advanced resampling techniques and custom threshold tuning to maximize the recall-weighted F2-score.",
    bullets: [
      "Formulated custom LightGBM hyperparameter sets and feature engineering for utilization gradients.",
      "Handled class imbalance using SMOTE and achieved F2-score of 0.60 with tuned LightGBM.",
    ],
    tags: ["LightGBM", "SMOTE", "Python", "Scikit-Learn"],
    github: "https://github.com/KrisKeshav/Credit-Card-Default-Prediction-using-Classification-and-Risk-Based-Techniques",
    metrics: [
      { label: "Optimized F2-Score", value: "0.60" },
      { label: "False Negative Reduction", value: "34%" },
      { label: "Dataset Size", value: "30,000+" },
    ],
    architecture: [
      "Raw Financial Data Ingestion & Preprocessing",
      "Imbalance Correction via Borderline-SMOTE",
      "Feature Engineering: Utilization Ratios & Repayment Gradients",
      "LightGBM Hyperparameter Tuning (Optuna)",
      "Risk Score Threshold Optimization for F2 Maximization",
    ],
    codeSnippet: {
      title: "model_pipeline.py",
      language: "python",
      code: `from imblearn.over_sampling import BorderlineSMOTE
import lightgbm as lgb

smote = BorderlineSMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_train, y_train)

params = {
    'objective': 'binary',
    'metric': 'custom_f2',
    'learning_rate': 0.03,
    'num_leaves': 31,
}
model = lgb.train(params, lgb.Dataset(X_res, label=y_res))`,
    },
  },
  {
    id: "smart-vision-qc",
    name: "Smart Vision Quality Control System",
    category: "Computer Vision",
    dates: "Oct 2024 – Dec 2024",
    description:
      "AI-based computer vision system for automated product classification and defect detection.",
    longDescription:
      "High-throughput edge vision solution for real-time manufacturing quality control. Built for Flipkart GRID 6.0 competition, securing 4th rank nationally out of thousands of participating engineering teams.",
    bullets: [
      "Designed dual-stage YOLOv8 detection pipeline with OpenCV bounding-box inference for high-speed edge inspection.",
      "Finished 4th nationally in Flipkart GRID 6.0 with this solution.",
    ],
    tags: ["Computer Vision", "YOLOv8", "OpenCV", "PyTorch"],
    github: "https://github.com/KrisKeshav/Smart-Vision-Quality-Control",
    metrics: [
      { label: "National Rank", value: "#4" },
      { label: "Processing Speed", value: "45 FPS" },
      { label: "Classification Accuracy", value: "98.4%" },
    ],
    architecture: [
      "Industrial Camera Input Stream (RTSP / USB)",
      "Frame Preprocessing & Bounding Box Extraction (OpenCV)",
      "YOLOv8 Dual-Stage Detection: Product Class + Defect Mask",
      "Decision Engine: Pass / Reject / Manual Review Routing",
      "Real-time Dashboard & Telemetry Storage",
    ],
    codeSnippet: {
      title: "vision_engine.py",
      language: "python",
      code: `import cv2
from ultralytics import YOLO

model = YOLO("grid_qc_best.pt")

def process_frame(frame):
    results = model(frame, conf=0.85)[0]
    defects = [box for box in results.boxes if box.cls == DEFECT_CLASS]
    status = "REJECT" if len(defects) > 0 else "PASS"
    return status, results.plot()`,
    },
  },
  {
    id: "text-to-image-gen",
    name: "Text-to-Image Generation",
    category: "AI / ML",
    dates: "May 2024 – Jun 2024",
    description:
      "Modular, local-inference pipeline using fine-tuned Stable Diffusion v1.5 and Hugging Face Diffusers.",
    longDescription:
      "A containerized local generative AI application enabling fast text-to-image creation without external API costs. Includes custom LoRA adapter integration and an interactive Streamlit user dashboard.",
    bullets: [
      "Fine-tuned DPM-Solver schedulers and custom LoRA weight injections in float16 precision.",
      "Built an interactive Streamlit dashboard and containerized the setup using Docker for reproducible deployment across different environments.",
    ],
    tags: ["Stable Diffusion", "Hugging Face", "Streamlit", "Docker"],
    github: "https://github.com/KrisKeshav/Text_to_Image_generator",
    metrics: [
      { label: "Inference Speed", value: "2.4s / img" },
      { label: "Container Size", value: "3.2 GB" },
      { label: "VRAM Footprint", value: "< 6 GB" },
    ],
    architecture: [
      "Streamlit UI -> Prompt Parser & Negative Prompt Enhancer",
      "Diffusers StableDiffusionPipeline (fp16 precision)",
      "Optional LoRA Weights Injector",
      "GPU Acceleration Layer (CUDA / TensorRT)",
      "Output Image Post-Processing & Download Handler",
    ],
    codeSnippet: {
      title: "pipeline.py",
      language: "python",
      code: `import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

def generate(prompt, num_steps=20):
    image = pipe(prompt, num_inference_steps=num_steps).images[0]
    return image`,
    },
  },
  {
    id: "microservice-observability",
    name: "Microservice Observability Pipeline",
    category: "Full Stack",
    dates: "Feb 2025 – Apr 2025",
    description: "Local, fully open-source observability pipeline to trace and debug failing requests across distributed microservices.",
    longDescription: "An event-driven log pipeline using Kafka to decouple log ingestion from processing, enabling multiple independent consumers like Loki for storage and custom anomaly detection. Implemented distributed tracing with OpenTelemetry and Jaeger, orchestrated on Kubernetes.",
    bullets: [
      "Integrated Fluent Bit log streaming with Jaeger distributed tracing span propagation across FastAPI endpoints.",
      "Designed an event-driven log pipeline using Kafka to decouple log ingestion from processing, enabling multiple independent consumers.",
      "Implemented distributed tracing with OpenTelemetry and Jaeger, and orchestrated the multi-component stack on Kubernetes."
    ],
    tags: ["Python", "FastAPI", "Docker", "Kubernetes", "Kafka", "Grafana"],
    github: "https://github.com/KrisKeshav/Microservice-Observability-Pipeline",
    metrics: [
      { label: "Microservices", value: "3" },
      { label: "Components", value: "6" }
    ],
    architecture: [
      "Microservices (FastAPI)",
      "Log ingestion via Fluent Bit",
      "Event streaming via Kafka",
      "Log storage in Loki and tracing in Jaeger"
    ],
    codeSnippet: {
      title: "tracing.py",
      language: "python",
      code: `from opentelemetry import trace\nfrom opentelemetry.exporter.jaeger.thrift import JaegerExporter\njaeger_exporter = JaegerExporter(agent_host_name="jaeger", agent_port=6831)`
    },
  },
  {
    id: "voice-genai-assistant",
    name: "Voice-first Personal GenAI Assistant",
    category: "AI / ML",
    dates: "Nov 2025 – Jan 2026",
    description: "Real-time voice-first personal assistant with hybrid action and knowledge workflows.",
    longDescription: "Developed a real-time voice-first personal assistant using LiveKit, OpenAI and Deepgram. Implemented function calling, intent parsing, contextual confirmations and semantic interruption for conversational realism.",
    bullets: [
      "Wired WebSocket audio streaming through Deepgram STT into low-latency OpenAI response handlers.",
      "Implemented function calling, intent parsing, contextual confirmations and semantic interruption for conversational realism.",
      "Achieved low-latency speech, intent and execution pipeline suitable for interactive agent use cases."
    ],
    tags: ["LiveKit", "OpenAI", "Deepgram", "Python"],
    github: "https://github.com/KrisKeshav/Voice-GenAI-Assistant",
    metrics: [
      { label: "Pipeline Latency", value: "< 400ms" },
      { label: "Modality", value: "Full Duplex Voice" }
    ],
    architecture: [
      "Speech-to-text via Deepgram",
      "Intent parsing & LLM via OpenAI",
      "Real-time communication via LiveKit"
    ],
    codeSnippet: {
      title: "agent.py",
      language: "python",
      code: `import livekit\nroom = livekit.Room()\nawait room.connect(url, token)`
    },
  },
  {
    id: "pinns-differential-equations",
    name: "Using PINNs to Solve Differential Equations",
    category: "AI / ML",
    dates: "Aug 2024 – Dec 2024",
    description: "Physics-Informed Neural Networks to solve ordinary and partial differential equations.",
    longDescription: "Applied Physics-Informed Neural Networks (PINNs) to solve ordinary and partial differential equations. Integrated governing physical constraints directly into the learning objective.",
    bullets: [
      "Embedded physical differential operator loss terms via automatic differentiation in PyTorch.",
      "Integrated governing physical constraints directly into the neural network optimization objective.",
      "Achieved R^2 scores of 0.971 and 0.990 for the real and imaginary components of the Nonlinear Schrödinger Equation."
    ],
    tags: ["PINNs", "Deep Learning", "PyTorch", "Physics"],
    github: "https://github.com/KrisKeshav/PINNs-Differential-Equations",
    metrics: [
      { label: "R² (Real)", value: "0.971" },
      { label: "R² (Imaginary)", value: "0.990" }
    ],
    architecture: [
      "Neural Network Approximation",
      "Physics Loss Function Formulation",
      "Automatic Differentiation"
    ],
    codeSnippet: {
      title: "pinn_loss.py",
      language: "python",
      code: `def loss_fn(model, x, t):\n    u = model(x, t)\n    u_t = torch.autograd.grad(u, t)\n    u_xx = torch.autograd.grad(u, x, order=2)\n    f = u_t - 1j * u_xx\n    return torch.mean(torch.abs(f)**2)`
    },
  },
  {
    id: "vscode-extension",
    name: "VS Code Extension for Competitive Programming",
    category: "Full Stack",
    dates: "Dec 2024 – Jan 2025",
    description: "VS Code extension integrating LeetCode with CPH to fetch sample test cases.",
    longDescription: "Built a VS Code extension integrating LeetCode with CPH to fetch sample test cases directly from problem URLs. Automated local testing by storing inputs and outputs as files and executing user programs.",
    bullets: [
      "Scraped and parsed problem DOM nodes to auto-generate I/O test fixtures locally.",
      "Automated local testing by storing inputs and outputs as files and executing user programs in C++ and Python.",
      "Implemented output comparison to highlight mismatches, improving debugging workflow for competitive programming."
    ],
    tags: ["VS Code", "TypeScript", "C++", "Python"],
    github: "https://github.com/KrisKeshav/CP-LeetCode-VSCode-Extension",
    metrics: [
      { label: "Supported Languages", value: "C++, Python" },
      { label: "Execution Time", value: "< 100ms" }
    ],
    architecture: [
      "VS Code Extension API",
      "LeetCode Problem Parser",
      "Local Code Executor",
      "Output Comparator"
    ],
    codeSnippet: {
      title: "extension.ts",
      language: "typescript",
      code: `import * as vscode from 'vscode';\nexport function activate(context: vscode.ExtensionContext) {\n  let disposable = vscode.commands.registerCommand('extension.fetchTests', () => {\n    // Fetch tests from URL and save locally\n  });\n}`
    },
  },
];

export type Publication = {
  title: string;
  venue: string;
  description: string;
  bullets: string[];
  github?: string;
  arxiv?: string;
  paperPdf?: string;
  certificatePdf?: string;
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
    paperPdf: "/paper-preprint.pdf",
    certificatePdf: "/presentation-certificate.pdf",
  },
];

export const awards: string[] = [
  "Presented our Research Paper at 6th IEEE International Conference on Sustainable Energy and Future Electric Transportation",
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
  {
    role: "Executive",
    org: "Electrical Engineering Student Society (EESS)",
    dates: "Feb 2025 – Present",
    bullets: [
      "Developed and maintained digital platforms for event promotions.",
      "Improved web engagement through UI/UX redesign using HTML, CSS, JavaScript and React."
    ],
  },
  {
    role: "Coordinator",
    org: "Cognizance, IIT Roorkee",
    dates: "Mar 2024",
    bullets: [
      "Managed and coordinated AgentX during IIT Roorkee's annual technical festival.",
      "Worked with participants and technical teams to ensure smooth event execution."
    ],
  },
  {
    role: "Hack-8-All Hackathon Participant",
    org: "MDG, IIT Roorkee",
    dates: "Aug 2024",
    bullets: [
      "Built an AI assistant supporting chatbot, image generation, video generation and language translation.",
      "Implemented login authentication and session storage for improved user experience."
    ],
  },
  {
    role: "Math Challenge Participant",
    org: "Kshitij, IIT Kharagpur",
    dates: "Feb 2022",
    bullets: [
      "Solved challenging mathematical problems in the IQ Challenge conducted by Kshitij 2022."
    ],
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
