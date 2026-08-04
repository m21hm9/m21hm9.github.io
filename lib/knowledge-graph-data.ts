import {
  education,
  skills,
  experience,
  projects,
  certifications,
} from "@/data/content";

export interface KnowledgeNode {
  id: string;
  name: string;
  group?: string;
  val?: number;
  color?: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  name?: string;
  value?: number;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

function slug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || str.replace(/\s/g, "-");
}

export function buildDigitalBrainData(): KnowledgeGraphData {
  const nodes: KnowledgeNode[] = [];
  const links: KnowledgeLink[] = [];
  const seenNodes = new Set<string>();

  function addNode(
    id: string,
    name: string,
    group: string,
    val: number = 6
  ): void {
    if (seenNodes.has(id)) return;
    seenNodes.add(id);
    nodes.push({ id, name, group, val });
  }

  function addLink(source: string, target: string, name?: string): void {
    links.push({ source: slug(source), target: slug(target), name });
  }

  // Education
  education.forEach((e) => {
    const id = slug(e.school);
    addNode(id, e.school, "education", 8);
  });

  // Skills (tech)
  skills.forEach((s) => {
    const id = slug(s.name);
    addNode(id, s.name, "skill", 7);
  });

  // Experience (company + role as combined node for clarity)
  experience.forEach((exp) => {
    const companyId = slug(exp.company);
    addNode(companyId, exp.company, "experience", 8);
    addNode(slug(exp.role), exp.role, "role", 6);
    addLink(exp.company, exp.role, "role at");
  });

  // Projects (add project tech as nodes if not in skills)
  projects.forEach((p) => {
    addNode(slug(p.title), p.title, "project", 8);
    p.tech.forEach((t) => {
      addNode(slug(t), t, "skill", 6);
      addLink(p.title, t, "uses");
    });
  });

  // Certifications
  certifications.forEach((c) => {
    addNode(slug(c.name), c.name, "certification", 6);
    addNode(slug(c.issuer), c.issuer, "issuer", 4);
    addLink(c.name, c.issuer, "by");
  });

  // Add "Data Science" as a domain node
  addNode("data-science", "Data Science", "domain", 8);

  // Ensure umbrella/domain nodes referenced by links exist,
  // otherwise graph edges may point to missing nodes (causing outliers).
  addNode(slug("SQL"), "SQL", "skill", 7);
  addNode(slug("NLP / LLM / RAG"), "NLP / LLM / RAG", "domain", 8);
  addNode(slug("Azure Databricks / PySpark"), "Azure Databricks / PySpark", "skill", 7);
  addNode(slug("React / Next.js / Node.js"), "React / Next.js / Node.js", "skill", 7);

  // Connect umbrella nodes to their underlying skills to reduce fragmentation.
  addLink("SQL", "PostgreSQL", "uses");
  addLink("SQL", "MySQL", "uses");

  addLink("NLP / LLM / RAG", "LangChain / LangGraph", "built with");

  addLink("Azure Databricks / PySpark", "Azure Databricks", "includes");
  addLink("Azure Databricks / PySpark", "PySpark", "includes");

  addLink("React / Next.js / Node.js", "React", "includes");
  addLink("React / Next.js / Node.js", "Next.js", "includes");
  addLink("React / Next.js / Node.js", "Node.js", "includes");

  // Education -> Skills (studied / foundation)
  addLink("City University of Hong Kong", "Data Science", "BSc");
  addLink("City University of Hong Kong", "Python", "studied");
  addLink("City University of Hong Kong", "SQL", "studied");
  addLink("City University of Hong Kong", "PyTorch", "studied");
  addLink("City University of Hong Kong", "React / Next.js / Node.js", "full-stack");
  addLink("City University of Hong Kong", "Jupyter", "notebooks");
  addLink("City University of Hong Kong", "Google Colab", "experiments");
  addLink("City University of Hong Kong", "LaTeX", "reports");

  // Experience -> Skills (used at work)
  addLink("AS Watson Group", "Python", "used");
  addLink("AS Watson Group", "Azure Databricks / PySpark", "used");
  addLink("AS Watson Group", "Git", "used");
  addLink("AS Watson Group", "SourceTree", "used");
  addLink("AS Watson Group", "CI/CD", "used");
  addLink("AS Watson Group", "SQL", "used");
  addLink("AS Watson Group", "Jira", "used");
  addLink("AS Watson Group", "DBeaver", "used");
  addLink("AS Watson Group", "Jupyter", "analysis");
  addLink("Versed Digital Technology Limited", "Python", "models");
  addLink("Versed Digital Technology Limited", "PyTorch", "ViT / VLM");
  addLink("Versed Digital Technology Limited", "HuggingFace Hub", "model hub");

  // The Bank of East Asia — ASR fine-tuning & data pipeline
  addLink("The Bank of East Asia", "Python", "used");
  addLink("The Bank of East Asia", "PyTorch", "fine-tuned");
  addLink("The Bank of East Asia", "HuggingFace Hub", "Qwen ASR");
  addLink("The Bank of East Asia", "NLP / LLM / RAG", "ASR / SFT");
  addLink("The Bank of East Asia", "Google Colab", "training");
  addLink("The Bank of East Asia", "Docker", "used");

  // User-requested tool connections
  // Connect PyCharm to the school (used during studies / coursework)
  addLink("PyCharm", "City University of Hong Kong", "used in study");

  // VS Code is used across education, experience, and projects ('for all')
  addLink("VS Code", "City University of Hong Kong", "used");
  addLink("VS Code", "AS Watson Group", "used");
  addLink("VS Code", "The Bank of East Asia", "used");
  addLink("VS Code", "Versed Digital Technology Limited", "used");
  addLink("VS Code", "Agentic Research Paper Reader", "used");

  // Extra project -> skill links for tech not in project.tech array
  addLink("Agentic Research Paper Reader", "NLP / LLM / RAG", "domain");
  addLink("Legal Reasoning LLM (Llama-3 Fine-tune)", "NLP / LLM / RAG", "domain");
  addLink("Legal Reasoning LLM (Llama-3 Fine-tune)", "HuggingFace Hub", "fine-tuned on");
  addLink("Legal Reasoning LLM (Llama-3 Fine-tune)", "Google Colab", "trained in");
  addLink("Reversible Semantic Anchor (RSA)", "NLP / LLM / RAG", "domain");
  addLink("Reversible Semantic Anchor (RSA)", "HuggingFace Hub", "models from");

  // Certifications -> Skills
  addLink("Machine Learning Specialization", "Python", "covers");
  addLink("Machine Learning Specialization", "Scikit-learn", "covers");
  addLink("Deep Learning Specialization", "PyTorch", "covers");
  addLink("Deep Learning Specialization", "TensorFlow", "covers");
  addLink("Generative AI with Large Language Models", "NLP / LLM / RAG", "covers");
  addLink("Generative AI with Large Language Models", "HuggingFace Hub", "covers");
  addLink("Agentic AI with LangChain & LangGraph", "LangChain / LangGraph", "covers");
  addLink("Data Science Job Simulation", "Jupyter", "covers");
  addLink("Data Science Job Simulation", "Python", "covers");

  // Skills that relate to each other
  addLink("LangChain / LangGraph", "Python", "built on");
  addLink("PyTorch", "Python", "built on");
  addLink("TensorFlow", "Python", "built on");
  addLink("Scikit-learn", "Python", "built on");
  addLink("React / Next.js / Node.js", "JavaScript", "built on");
  addLink("NLP / LLM / RAG", "Python", "APIs");
  addLink("NLP / LLM / RAG", "HuggingFace Hub", "ecosystem");
  addLink("SourceTree", "Git", "GUI for");
  addLink("Jupyter", "Python", "runs");
  addLink("Google Colab", "Python", "runs");
  addLink("Google Colab", "PyTorch", "GPU training");

  return { nodes, links };
}

export const DIGITAL_BRAIN_DATA = buildDigitalBrainData();
