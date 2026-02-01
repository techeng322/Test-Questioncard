# QuestionCard

## 1. Архитектура

```
QuestionCard
├── QuestionStem        — рендер TipTap JSON, обернут в ErrorBoundary, скролл при длинном тексте
├── AnswerOptions       — список кнопок, disabled после проверки, подсветка correct/incorrect
├── ActionBar           — кнопка Check (disabled пока нет выбора / пока идет запрос) + Next
└── Explanation         — скрыт до check, блюр + CTA в demo, fallback если нет объяснения
```

Все состояние — локальное, в кастомном хуке `useQuestionCard`:

- `selectedAnswerId` — выбранный ответ. Сбрасывается при смене вопроса. Заблокирован после check.
- `isChecked` — прошла ли проверка. Сброс при смене.
- `isCorrect` — результат проверки.
- `showExplanation` — true только после check + если explanation есть.
- `isChecking` — loading флаг, блокирует кнопку.

**Смена questionId** → useEffect сбрасывает все. Ref `questionRef` сравнивается после await, чтобы выбросить ответ от предыдущего вопроса если пользователь переключился пока шел запрос.

**Быстрые клики** → `checkingRef` (мутабельный ref, не state) работает как мьютекс, не дает отправить повторный запрос. Кнопка Check disabled пока `isChecking`. После check — options disabled.

---

## 2. Псевдокод

```
state: selectedAnswerId, isChecked, isCorrect, showExplanation, isChecking
refs:  checkingRef, questionRef

onQuestionChange(newId):
  reset все state
  checkingRef = false
  questionRef = newId

selectAnswer(id):
  if isChecked → return
  selectedAnswerId = id

checkAnswer():
  if !selectedAnswerId or isChecked or checkingRef → return
  checkingRef = true, isChecking = true
  savedId = questionRef

  try:
    await api.check()
    if questionRef != savedId → return   // вопрос сменился, выбрасываем
    isCorrect = selectedAnswerId == correctId
    isChecked = true
    if hasExplanation → showExplanation = true
  catch:
    // ошибка api — разрешаем повтор, не ставим isChecked
  finally:
    checkingRef = false, isChecking = false

disabled:
  Check — когда !selectedAnswerId или isChecking
  Options — когда isChecked
```

---

## 3. Edge cases

- **explanation отсутствует** — показываем плашку "No explanation available" вместо пустоты
- **stem только формулы** — TipTap рендерит code блоки, ErrorBoundary ловит если рендер падает
- **очень длинный stem** — max-height + overflow-y: auto, не ломает layout
- **KaTeX упал** — ErrorBoundary → fallback "render error", katex.renderToString с throwOnError: false как первый рубеж
- **смена ответа после check** — selectAnswer() выходит если isChecked, options disabled
- **быстрые клики Check** — checkingRef не дает повторный запрос, кнопка disabled
- **смена вопроса во время запроса** — questionRef сравнивается после await, stale результат выбрасывается
- **demo режим** — explanation заблюрен (filter: blur(5px)), оверлей с текстом + кнопка "Upgrade Now"
