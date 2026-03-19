// Content aligned with Thom Man Hei Matthew CV

export const education = [
  {
    school: "City University of Hong Kong",
    degree: "Bachelor of Science in Data Science",
    period: "Aug. 2024 – June 2028",
    description: "Hong Kong",
  },
];

// image: URL to logo (Simple Icons CDN or your own /public path)
export const skills = [
  { name: "Python", image: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java", image: "https://cdn.simpleicons.org/openjdk/437291" },
  { name: "C++", image: "https://cdn.simpleicons.org/cplusplus/00599C" },
  { name: "JavaScript", image: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", image: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "PostgreSQL", image: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySQL", image: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Supabase", image: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  { name: "PyTorch", image: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "TensorFlow", image: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "Scikit-learn", image: "https://cdn.simpleicons.org/scikitlearn/F89939" },
  { name: "LangChain / LangGraph", image: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { name: "Huggingface", image: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "Azure Databricks", image: "https://cdn.simpleicons.org/databricks/FF3621" },
  { name: "PySpark", image: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "React", image: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", image: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "OpenCV", image: "https://cdn.simpleicons.org/opencv" },
  { name: "Git / CI/CD", image: "https://cdn.simpleicons.org/git/F05032" },
];

export const experience = [
  {
    company: "AS Watson Group",
    role: "Data Analysis Assistant",
    period: "June 2025 – Present",
    location: "Hong Kong",
    bullets: [
      "Supported the world's largest health & beauty retailer (CKH member, HKEX:0001).",
      "Joined daily Agile ceremonies; tracked scrum board; unblocked with PM & QA Lead.",
      "Built E2E tests for ML outputs (UI/non-UI) in Databricks + PySpark across PROD/UAT.",
      "Built a test-results dashboard for faster triage; cut investigation/debug time by 70–80%.",
    ],
  },
  {
    company: "Versed Digital Technology Limited",
    role: "Venture Consultant – AI Vision",
    period: "Sept. 2025 – Present",
    location: "Hong Kong",
    bullets: [
      "DCF models and pitch decks for valuation and funding-round planning.",
      "Technical validation partnerships with VCs and academic institutions.",
      "Research on Vision Transformers, VLMs, and multimodal reasoning to drive company development.",
    ],
  },
  {
    company: "QualiFly Education",
    role: "Lead Software Engineer",
    period: "Dec. 2025 – Jan. 2026",
    location: "Hong Kong",
    bullets: [
      "Led team through Agile cycles; scaled from 1 to N.",
      "Architecture, refactoring, grammar-check + quiz system, adaptive flashcards, Stripe; B2B/B2C.",
      "User feedback, roadmap prioritization, and product iteration with business development.",
    ],
  },
];

// Tech name (as used in projects) -> Simple Icons CDN image URL for Key Projects
export const techIcons: Record<string, string> = {
  Python: "https://cdn.simpleicons.org/python/3776AB",
  LangGraph: "https://cdn.simpleicons.org/langchain/1C3C3C",
  FastAPI: "https://cdn.simpleicons.org/fastapi/009688",
  Supabase: "https://cdn.simpleicons.org/supabase/3FCF8E",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  "DeepSeek LLM": "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/deepseek/icon.png",
  Tavily: "https://cdn.simpleicons.org/google/4285F4",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  Streamlit: "https://cdn.simpleicons.org/streamlit/FF4B4B",
  PyTorch: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  "Hugging Face": "https://cdn.simpleicons.org/huggingface/FFD21E",
};

export const projects = [
  {
    title: "Agentic Research Paper Reader",
    description:
      "Agentic Research Paper Reader is a multi-agent research assistant that understands natural-language research queries, searches arXiv + OpenAlex + Crossref + Tavily, stores papers in Supabase + pgvector, ranks and reflects on results, and lets you select papers for deeper analysis and insight synthesis. The system is built with FastAPI, uses DeepSeek for reasoning (and optional embeddings), and includes a small HTML/JS frontend.",
    tech: ["Python", "FastAPI", "Supabase", "DeepSeek LLM", "Tavily", "JavaScript", "PostgreSQL"],
    github: "https://github.com/m21hm9/Autonomous-Research-Agent-v1",
    liveUrl: null as string | null,
  },
  {
    title: "Legal Reasoning LLM (Llama-3 Fine-tune)",
    description:
      "Developed \"Headnote LLM\", a domain-specific 8B-parameter model by fine-tuning Meta Llama-3.1 on 10k+ legal judgment datasets. Achieved state-of-the-art performance on legal reasoning tasks while adding only ∼168 MB of trainable parameters via LoRA adapters.",
    tech: ["Python", "PyTorch", "Hugging Face", "LoRA"],
    github: null as string | null, // Code only on Colab
    // Paste your Google Colab notebook link below (replace the URL with your shareable Colab link)
    liveUrl: "https://colab.research.google.com/drive/YOUR_NOTEBOOK_ID",
  },
  {
    title: "Statistical Arbitrage Trading Algorithm",
    description:
      "StatArb is a comprehensive Python platform for statistical arbitrage across equities, FX, crypto, and metals. It combines multivariate basket stat-arb (GMM-HMM regime switching), factor models, optional XGBoost signals, and advanced risk management/analytics into a single, configurable trading and research toolkit.",
    tech: ["Python", "Alpaca API", "XGBoost", "GMM-HMM"],
    github: "https://github.com/m21hm9/statarb",
    liveUrl: null as string | null,
  },
];

// Your credential verification links (from CV).
export const certifications = [
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/5013f1a28b33e787e11ee8fa406c3826" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/d5016fb6e84fce87dd8e98e2cd62e59a" },
  { name: "Machine Learning in Production", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/db2a4dbc3b639005430f88266839744c" },
  { name: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/914aba5edb8d64855ea04a464df16731" },
  { name: "Agentic AI with LangChain & LangGraph", issuer: "IBM", year: "credential", url: "https://coursera.org/share/4e58800b78daf6fc6aab05826f089ae4" },
  { name: "Certification of Service (Leadership)", issuer: "City University of Hong Kong", year: "credential", url: "https://eu.credential.net/2f0de841-cbb0-4c5e-9175-0a1669348fda#acc.O1Pn5U6r" },
  { name: "Student Chapter of Department of Data Science (2024–2025)", issuer: "City University of Hong Kong", year: "credential", url: "https://eu.credential.net/2f0de841-cbb0-4c5e-9175-0a1669348fda#acc.O1Pn5U6r" },
];

export const contact = {
  email: "matthewthom0629@gmail.com",
  phone: "+852-5110-9186",
  linkedin: "https://linkedin.com/in/thommanheimatthew",
  github: "https://github.com/m21hm9",
  huggingface: "https://huggingface.co/matt2py2",
};
