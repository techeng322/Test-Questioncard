import type { QuestionCardProps } from "../types";
import { useQuestionCard } from "../hooks/useQuestionCard";
import { QuestionStem } from "./QuestionStem";
import { AnswerOptions } from "./AnswerOptions";
import { ActionBar } from "./ActionBar";
import { Explanation } from "./Explanation";

export function QuestionCard({ question, isDemo = false, onNextQuestion }: QuestionCardProps) {
  const state = useQuestionCard({
    questionId: question.id,
    correctAnswerId: question.correctAnswerId,
    hasExplanation: !!question.explanation,
    isDemo,
  });

  return (
    <div className="question-card">
      <QuestionStem content={question.stem} />

      <AnswerOptions
        options={question.options}
        selectedId={state.selectedAnswerId}
        isChecked={state.isChecked}
        isCorrect={state.isCorrect}
        correctId={question.correctAnswerId}
        onSelect={state.selectAnswer}
      />

      <ActionBar
        canCheck={!!state.selectedAnswerId}
        isChecking={state.isChecking}
        isChecked={state.isChecked}
        isCorrect={state.isCorrect}
        onCheck={state.checkAnswer}
        onNext={onNextQuestion}
      />

      {state.showExplanation && (
        <Explanation
          content={question.explanation}
          isDemo={isDemo}
        />
      )}
    </div>
  );
}
