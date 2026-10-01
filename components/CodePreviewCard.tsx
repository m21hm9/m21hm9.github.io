import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/content";
import "./CodePreviewCard.css";

export function CodePreviewCard() {
  return (
    <div className="code-preview-card" aria-label="About Matthew">
      <div className="code-preview-header">
        <div className="code-preview-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>about.sh</span>
        <span className="code-preview-status">~/matthew</span>
      </div>
      <div className="code-preview-body">
        <p className="code-preview-command"><span aria-hidden="true">$</span> whoami</p>
        <p className="code-preview-output">Matthew Thom · data science / AI / Hong Kong</p>
        <p className="code-preview-command"><span aria-hidden="true">$</span> cat interests.txt</p>
        <p className="code-preview-output">AI research / model evaluation / data science</p>
        <p className="code-preview-command"><span aria-hidden="true">$</span> open github</p>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="code-preview-link">
          github.com/m21hm9 <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
