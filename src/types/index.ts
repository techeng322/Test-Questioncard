import type { JSONContent } from "@tiptap/react";

export interface AnswerOption {
  id: string;
  label: string;
  content: JSONContent;
}

export interface Question {
  id: string;
  stem: JSONContent;
  options: AnswerOption[];
  correctAnswerId: string;
  explanation?: JSONContent;
}

export interface QuestionCardProps {
  question: Question;
  isDemo?: boolean;
  onNextQuestion?: () => void;
}
