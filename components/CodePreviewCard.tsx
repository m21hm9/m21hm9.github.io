import "./CodePreviewCard.css";

export function CodePreviewCard() {
  return (
    <div className="code-preview-card">
      <div className="mac-header">
        <span className="red" />
        <span className="yellow" />
        <span className="green" />
      </div>
      <span className="card-title">HAHAHA</span>
      <div className="code-editor">
        <pre>
          <code>&lt;h1&gt; I don&apos;t know haha &lt;/h1&gt;</code>
        </pre>
      </div>
    </div>
  );
}
