import type { Question } from "../types";

// helper to keep the tiptap json less noisy
function textDoc(text: string) {
  return {
    type: "doc" as const,
    content: [{ type: "paragraph" as const, content: [{ type: "text" as const, text }] }],
  };
}

export const mockQuestions: Question[] = [
  {
    id: "q1",
    stem: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "What is the derivative of " },
            { type: "text", marks: [{ type: "code" }], text: "f(x) = x² + 3x + 5" },
            { type: "text", text: " ?" },
          ],
        },
      ],
    },
    options: [
      { id: "a", label: "A", content: textDoc("2x + 3") },
      { id: "b", label: "B", content: textDoc("x + 3") },
      { id: "c", label: "C", content: textDoc("2x + 5") },
      { id: "d", label: "D", content: textDoc("x² + 3") },
    ],
    correctAnswerId: "a",
    explanation: textDoc(
      "The derivative of x² is 2x, the derivative of 3x is 3, and the derivative of a constant (5) is 0. So f'(x) = 2x + 3."
    ),
  },
  {
    id: "q2",
    stem: textDoc("Which of the following is a valid way to declare a variable in JavaScript?"),
    options: [
      { id: "a", label: "A", content: textDoc("var x = 10;") },
      { id: "b", label: "B", content: textDoc("variable x = 10;") },
      { id: "c", label: "C", content: textDoc("int x = 10;") },
      { id: "d", label: "D", content: textDoc("dim x = 10;") },
    ],
    correctAnswerId: "a",
    explanation: textDoc(
      "In JavaScript you use var, let, or const to declare variables. The others are not valid JS keywords."
    ),
  },
  {
    id: "q3",
    stem: textDoc(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. What is 2 + 2?"
    ),
    options: [
      { id: "a", label: "A", content: textDoc("3") },
      { id: "b", label: "B", content: textDoc("4") },
      { id: "c", label: "C", content: textDoc("5") },
    ],
    correctAnswerId: "b",
    // no explanation on purpose
  },
];
