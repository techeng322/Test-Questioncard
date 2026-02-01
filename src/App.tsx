import { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { mockQuestions } from "./data/mockQuestions";
import "./App.css";

function App() {
  const [idx, setIdx] = useState(0);
  const [demo, setDemo] = useState(false);
  const q = mockQuestions[idx];

  return (
    <div className="app">
      <header className="app-header">
        <h1>QuestionCard</h1>
        <div className="controls">
          <label className="demo-toggle">
            <input type="checkbox" checked={demo} onChange={e => setDemo(e.target.checked)} />
            Demo mode
          </label>
          <span className="question-counter">
            {idx + 1} / {mockQuestions.length}
          </span>
        </div>
      </header>

      <main>
        <QuestionCard
          key={q.id}
          question={q}
          isDemo={demo}
          onNextQuestion={() => setIdx(i => (i + 1) % mockQuestions.length)}
        />
      </main>
    </div>
  );
}

export default App;
