// Content aligned with Thom Man Hei Matthew CV

export const education = [
  {
    school: "City University of Hong Kong",
    degree: "Bachelor of Science in Data Science, Minor in Psychology",
    period: "Aug. 2024 – June 2028",
    description: "Hong Kong",
  },
];

// image: URL to logo (Simple Icons / jsDelivr devicon, or /public path)
export interface SkillItem {
  name: string;
  image?: string;
}

export interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", image: "https://cdn.simpleicons.org/python/3776AB" },
      {name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/java/java-original.svg", },
      { name: "C++", image: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "SQL", image: "/icons/sql.svg" },
      { name: "JavaScript", image: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", image: "https://cdn.simpleicons.org/typescript/3178C6" },
    ],
  },
  {
    title: "AI/ML",
    skills: [
      { name: "PyTorch", image: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
      { name: "TensorFlow", image: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
      { name: "Scikit-learn", image: "https://cdn.simpleicons.org/scikitlearn/F89939" },
      {
        name: "LangChain / LangGraph",
        image: "https://cdn.simpleicons.org/langchain/1C3C3C",
      },
    ],
  },
  {
    title: "Data & Cloud",
    skills: [
      { name: "Azure Databricks", image: "https://cdn.simpleicons.org/databricks/FF3621" },
      { name: "PySpark", image: "https://cdn.simpleicons.org/apachespark/E25A1C" },
      { name: "PostgreSQL", image: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Supabase", image: "https://cdn.simpleicons.org/supabase/3FCF8E" },
      { name: "MySQL", image: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "DBeaver", image: "https://cdn.simpleicons.org/dbeaver/382923" },
    ],
  },
  {
    title: "Web & DevOps",
    skills: [
      { name: "React", image: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", image: "https://cdn.simpleicons.org/nextdotjs/000000" },
      { name: "Node.js", image: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Git", image: "https://cdn.simpleicons.org/git/F05032" },
      { name: "SourceTree", image: "https://cdn.simpleicons.org/sourcetree/0052CC" },
      { name: "Docker", image: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Linux", image: "https://cdn.simpleicons.org/linux/FCC624" },
      { name: "CI/CD", image: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "Jira", image: "https://cdn.simpleicons.org/jira/0052CC" },
      { name: "Vercel", image: "https://cdn.simpleicons.org/vercel/000000" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Figma", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
      { name: "LaTeX", image: "https://cdn.simpleicons.org/latex/008080" },
      { name: "VS Code", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
      { name: "PyCharm", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pycharm/pycharm-original.svg" },
      { name: "Google Colab", image: "https://cdn.simpleicons.org/googlecolab/F9AB00" },
      { name: "Jupyter", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg" },
      { name: "HuggingFace Hub", image: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" }
    ],
  },
];

/** Flat list for marquee, knowledge graph, and any legacy consumers */
export const skills: SkillItem[] = skillGroups.flatMap((g) => g.skills);

export const experience = [
  {
    company: "The Bank of East Asia",
    role: "Summer Intern — Fintech",
    period: "June 2026 – August 2026",
    location: "Hong Kong & Shenzhen (Qianhai)",
    bullets: [
      "Built an end-to-end pipeline with Cantonese-English audio and TTS finance data to fine-tune Qwen-1.7B ASR.",
      "Designed context-aware SFT with controlled context injection to preserve base model alignment.",
      "Tuned hyperparameters with Optuna, substantially reducing WER and notably improving CER compared to the base Qwen-1.7B model.",
    ],
  },
  {
    company: "AS Watson Group",
    role: "Data Analysis Assistant",
    period: "June. 2025 – May. 2026",
    location: "Hong Kong",
    bullets: [
      "Performed QA testing and validation on AI models with trillion-scale datasets.",
      "Built automated end-to-end testing frameworks using Databricks and PySpark.",
      "Developed real-time dashboard that cut debugging time by 70-80%.",
      "Achieved 100% story points completion every sprint.",
    ],
  },
  {
    company: "Versed Digital Technology Limited",
    role: "AI Consultant",
    period: "Sept. 2025 – May. 2026",
    location: "Hong Kong",
    bullets: [
      "Backed by Cyberport & VCs.",
      "Created DCF financial models and pitch decks for valuation and fundraising.",
      "Researched ViT and VLM models, achieving 99.9% accuracy and 30% lower human cost.",
      "Built technical validation partnerships with VCs and universities.",
    ],
  },
];

// Tech name (as used in projects) -> Simple Icons CDN image URL for Key Projects
export const techIcons: Record<string, string> = {
  Python: "https://cdn.simpleicons.org/python/3776AB",
  "LangChain / LangGraph": "https://cdn.simpleicons.org/langchain/1C3C3C",
  LangGraph: "https://cdn.simpleicons.org/langchain/1C3C3C",
  LangChain: "https://cdn.simpleicons.org/langchain/1C3C3C",
  FastAPI: "https://cdn.simpleicons.org/fastapi/009688",
  Supabase: "https://cdn.simpleicons.org/supabase/3FCF8E",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  "DeepSeek LLM": "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/deepseek/icon.png",
  Tavily: "https://cdn.simpleicons.org/google/4285F4",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  Streamlit: "https://cdn.simpleicons.org/streamlit/FF4B4B",
  PyTorch: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  Transformers: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "Hugging Face": "https://cdn.simpleicons.org/huggingface/FFD21E",
};

export interface Project {
  title: string;
  category: string;
  summary: string;
  question: string;
  highlights: string[];
  tech: string[];
  github: string;
  metric?: { value: string; label: string; url: string };
}

// Mirrors the first four pinned repositories on Matthew's GitHub profile.
export const projects: Project[] = [
  {
    title: "torch-molecule",
    category: "Open source / molecular AI",
    summary:
      "Contributing to an open-source Python package that makes molecular prediction, generation and representation models easier to use.",
    question: "How can molecular AI models become easier to use in practical research?",
    highlights: [
      "Integrated pretrained molecular generators, including NovoMolGen, MolGen, Molexar and SAFE-GPT.",
      "Contributed dataset splitting modules for molecular machine-learning workflows.",
    ],
    tech: ["Python", "PyTorch", "Molecular AI", "Open source"],
    github: "https://github.com/m21hm9/torch-molecule",
    metric: {
      value: "20K+",
      label: "lifetime PyPI downloads for the package",
      url: "https://pepy.tech/projects/torch-molecule",
    },
  },
  {
    title: "Autonomous Research Agent v0",
    category: "AI agents / research tools",
    summary:
      "A LangGraph research assistant that breaks a broad question into targeted searches and assembles a sourced report.",
    question: "Can an AI agent turn an open-ended topic into a sourced research report?",
    highlights: [
      "Uses DeepSeek to generate queries and Tavily to search them in parallel.",
      "Reflects on research completeness before producing a Markdown report through a Streamlit interface.",
    ],
    tech: ["Python", "LangGraph", "DeepSeek LLM", "Tavily", "Streamlit"],
    github: "https://github.com/m21hm9/Autonomous-Research-Agent-v0",
  },
  {
    title: "Time-Series Anomaly Detection",
    category: "Machine learning / data pipelines",
    summary:
      "A modular pipeline for finding unusual behavior in univariate and multivariate time-series data.",
    question: "How can different models detect unusual patterns in time-series data?",
    highlights: [
      "Combines preprocessing, sliding windows and detectors such as Isolation Forest, One-Class SVM and autoencoders.",
      "Includes threshold selection, evaluation metrics and visualizations for inspecting detection quality.",
    ],
    tech: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
    github: "https://github.com/m21hm9/Anomaly-Detection-in-Time-Series-Data",
  },
  {
    title: "Reversible Semantic Anchor (RSA)",
    category: "AI research / experiments",
    summary:
      "An experimental approach to preserving meaning when information moves between AI agents through a compact latent representation.",
    question: "Can a compact latent anchor preserve intent across multiple AI handoffs?",
    highlights: [
      "Built a six-layer Transformer encoder and decoder reconstruction pipeline.",
      "Added training, drift evaluation and stress-test workflows for multi-step handoffs.",
    ],
    tech: ["Python", "PyTorch", "Transformers", "Hugging Face"],
    github: "https://github.com/m21hm9/Reversible-Semantic-Anchor",
  },
];

// Your credential verification links (from CV).
export const certifications = [
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/5013f1a28b33e787e11ee8fa406c3826" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/d5016fb6e84fce87dd8e98e2cd62e59a" },
  { name: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", year: "credential", url: "https://coursera.org/share/914aba5edb8d64855ea04a464df16731" },
  { name: "Agentic AI with LangChain & LangGraph", issuer: "IBM", year: "credential", url: "https://coursera.org/share/4e58800b78daf6fc6aab05826f089ae4" },
  { name: "Data Science Job Simulation", issuer: "BCG", year: "credential", url: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_6a0993e20d4494e113239f06_1779436786164_completion_certificate.pdf" },
  { name: "J.P. Morgan - Quantitative Research Job Simulation", issuer: "JPMorganChase", year: "credential", url: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_6a0993e20d4494e113239f06_1779013422410_completion_certificate.pdf" },
  { name: "Bloomberg Market Concepts", issuer: "Bloomberg", year: "credential", url: "https://portal.bloombergforeducation.com/certificates/wRnYcLnPSafpGE71EZghWB9p" },
];

export const contact = {
  email: "matthewthom0629@gmail.com",
  phone: "+852-5110-9186",
  linkedin: "https://hk.linkedin.com/in/matthew-thom-a04306370",
  github: "https://github.com/m21hm9",
  huggingface: "https://huggingface.co/matt2py2",
};
