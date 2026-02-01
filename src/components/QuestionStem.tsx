import type { JSONContent } from "@tiptap/react";
import { TipTapRenderer } from "./TipTapRenderer";
import { ErrorBoundary } from "./ErrorBoundary";

export function QuestionStem({ content }: { content: JSONContent }) {
  return (
    <div className="question-stem">
      <ErrorBoundary fallback={<div className="render-error">Could not render question</div>}>
        <TipTapRenderer content={content} />
      </ErrorBoundary>
    </div>
  );
}
