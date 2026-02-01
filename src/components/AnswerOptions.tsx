import type { AnswerOption } from "../types";
import { TipTapRenderer } from "./TipTapRenderer";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  options: AnswerOption[];
  selectedId: string | null;
  isChecked: boolean;
  isCorrect: boolean | null;
  correctId: string;
  onSelect: (id: string) => void;
}

export function AnswerOptions({ options, selectedId, isChecked, isCorrect, correctId, onSelect }: Props) {
  function optionClass(id: string) {
    let cls = "answer-option";
    if (selectedId === id) cls += " selected";
    if (isChecked) {
      cls += " checked";
      if (id === correctId) cls += " correct";
      else if (selectedId === id && !isCorrect) cls += " incorrect";
    }
    return cls;
  }

  return (
    <div className="answer-options">
      {options.map(opt => (
        <button
          key={opt.id}
          className={optionClass(opt.id)}
          onClick={() => onSelect(opt.id)}
          disabled={isChecked}
        >
          <span className="option-label">{opt.label}</span>
          <span className="option-content">
            <ErrorBoundary fallback={<span className="render-error">Render error</span>}>
              <TipTapRenderer content={opt.content} />
            </ErrorBoundary>
          </span>
        </button>
      ))}
    </div>
  );
}
