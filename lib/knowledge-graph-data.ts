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

  // Education -> Skills (studied / foundation)
  addLink("City University of Hong Kong", "Data Science", "BSc");
  addLink("City University of Hong Kong", "Python", "studied");
  addLink("City University of Hong Kong", "SQL", "studied");
  addLink("City University of Hong Kong", "PyTorch", "studied");
  addLink("City University of Hong Kong", "React / Next.js / Node.js", "full-stack");

  // Experience -> Skills (used at work)
  addLink("AS Watson Group", "Python", "used");
  addLink("AS Watson Group", "Azure Databricks / PySpark", "used");
  addLink("AS Watson Group", "Git / CI/CD", "used");
  addLink("AS Watson Group", "SQL", "used");
  addLink("Versed Digital Technology Limited", "Python", "models");
  addLink("QualiFly Education", "React / Next.js / Node.js", "built");
  addLink("QualiFly Education", "Python", "backend");
  addLink("QualiFly Education", "Git / CI/CD", "used");

  // Extra project -> skill links for tech not in project.tech array
  addLink("Autonomous Research Agent (DeepSeek-powered)", "NLP / LLM / RAG", "domain");
  addLink("Legal Reasoning LLM (Llama-3 Fine-tune)", "NLP / LLM / RAG", "domain");

  // Certifications -> Skills
  addLink("Machine Learning Specialization", "Python", "covers");
  addLink("Machine Learning Specialization", "Scikit-learn", "covers");
  addLink("Deep Learning Specialization", "PyTorch", "covers");
  addLink("Deep Learning Specialization", "TensorFlow", "covers");
  addLink("Generative AI with Large Language Models", "NLP / LLM / RAG", "covers");
  addLink("Agentic AI with LangChain & LangGraph", "LangChain / LangGraph", "covers");
  addLink("Machine Learning in Production", "Azure Databricks / PySpark", "covers");

  // Skills that relate to each other
  addLink("LangChain / LangGraph", "Python", "built on");
  addLink("PyTorch", "Python", "built on");
  addLink("TensorFlow", "Python", "built on");
  addLink("Scikit-learn", "Python", "built on");
  addLink("React / Next.js / Node.js", "JavaScript", "built on");
  addLink("NLP / LLM / RAG", "Python", "APIs");

  return { nodes, links };
}

export const DIGITAL_BRAIN_DATA = buildDigitalBrainData();
