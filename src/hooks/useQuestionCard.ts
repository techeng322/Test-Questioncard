import { useState, useCallback, useRef, useEffect } from "react";

export function useQuestionCard({
  questionId,
  correctAnswerId,
  hasExplanation,
  isDemo,
}: {
  questionId: string;
  correctAnswerId: string;
  hasExplanation: boolean;
  isDemo: boolean;
}) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // prevent double-submit on rapid clicks
  const checkingRef = useRef(false);
  const questionRef = useRef(questionId);

  // reset everything when we get a new question
  useEffect(() => {
    questionRef.current = questionId;
    setSelectedAnswerId(null);
    setIsChecked(false);
    setIsCorrect(null);
    setShowExplanation(false);
    setIsChecking(false);
    checkingRef.current = false;
  }, [questionId]);

  const selectAnswer = useCallback((id: string) => {
    if (isChecked) return;
    setSelectedAnswerId(id);
  }, [isChecked]);

  const checkAnswer = useCallback(async () => {
    if (!selectedAnswerId || isChecked || checkingRef.current) return;

    checkingRef.current = true;
    setIsChecking(true);
    const qId = questionRef.current;

    try {
      // would be a real api call in prod
      await new Promise(r => setTimeout(r, 500));

      // question changed while waiting — throw away the result
      if (questionRef.current !== qId) return;

      const correct = selectedAnswerId === correctAnswerId;
      setIsCorrect(correct);
      setIsChecked(true);

      if (hasExplanation) {
        setShowExplanation(true);
      }
    } catch {
      // let user retry on failure
      checkingRef.current = false;
      setIsChecking(false);
      return;
    }

    checkingRef.current = false;
    setIsChecking(false);
  }, [selectedAnswerId, isChecked, correctAnswerId, hasExplanation]);

  return {
    selectedAnswerId,
    isChecked,
    isCorrect,
    showExplanation,
    isChecking,
    isDemo,
    selectAnswer,
    checkAnswer,
  };
}
