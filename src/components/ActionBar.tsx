interface Props {
  canCheck: boolean;
  isChecking: boolean;
  isChecked: boolean;
  isCorrect: boolean | null;
  onCheck: () => void;
  onNext?: () => void;
}

export function ActionBar({ canCheck, isChecking, isChecked, isCorrect, onCheck, onNext }: Props) {
  if (!isChecked) {
    return (
      <div className="action-bar">
        <button
          className="btn btn-check"
          onClick={onCheck}
          disabled={!canCheck || isChecking}
        >
          {isChecking ? "Checking..." : "Check Answer"}
        </button>
      </div>
    );
  }

  return (
    <div className="action-bar">
      <div className="check-result">
        <span className={`result-badge ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
        </span>
        {onNext && (
          <button className="btn btn-next" onClick={onNext}>
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
}
