import type { JSONContent } from "@tiptap/react";
import { TipTapRenderer } from "./TipTapRenderer";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  content?: JSONContent;
  isDemo: boolean;
}

export function Explanation({ content, isDemo }: Props) {
  if (!content) {
    return (
      <div className="explanation">
        <div className="explanation-header">Explanation</div>
        <p className="text-muted">No explanation available for this question.</p>
      </div>
    );
  }

  if (isDemo) {
    return (
      <div className="explanation explanation-demo">
        <div className="explanation-header">Explanation</div>
        <div className="explanation-blurred" aria-hidden="true">
          <ErrorBoundary fallback={<span className="render-error">Render error</span>}>
            <TipTapRenderer content={content} />
          </ErrorBoundary>
        </div>
        <div className="demo-overlay">
          <p>Unlock full explanations with a premium account</p>
          <button className="btn btn-upgrade">Upgrade Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="explanation">
      <div className="explanation-header">Explanation</div>
      <ErrorBoundary fallback={<div className="render-error">Could not render explanation</div>}>
        <TipTapRenderer content={content} />
      </ErrorBoundary>
    </div>
  );
}
