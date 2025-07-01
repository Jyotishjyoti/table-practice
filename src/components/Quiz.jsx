import { useState, useEffect } from 'react';

export default function Quiz({ selectedTables, numQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Generate random questions from selectedTables
    const newQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      const tableNum = selectedTables[Math.floor(Math.random() * selectedTables.length)];
      const multiplier = Math.floor(Math.random() * 12) + 1; // 1 to 12
      newQuestions.push({ tableNum, multiplier, answer: tableNum * multiplier });
    }
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setUserAnswer('');
    setScore(0);
    setQuizOver(false);
    setFeedback('');
  }, [selectedTables, numQuestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentQ = questions[currentIndex];
    if (!userAnswer) {
      setFeedback('Please enter an answer.');
      return;
    }

    const isCorrect = Number(userAnswer) === currentQ.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setFeedback(isCorrect ? 'Correct!' : `Wrong! The answer is ${currentQ.answer}`);

    setTimeout(() => {
      setFeedback('');
      setUserAnswer('');
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setQuizOver(true);
      }
    }, 1000);
  };

  if (quizOver) {
    const accuracy = ((score / questions.length) * 100).toFixed(1);
    return (
      <div>
        <h3>Quiz Completed!</h3>
        <p>
          Your score: {score} / {questions.length} ({accuracy}%)
        </p>
        <button onClick={() => setQuizOver(false)} style={{ padding: '10px 20px' }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  return (
    <div>
      <p className="quiz-question">
        Question {currentIndex + 1} of {questions.length}: What is {currentQ.tableNum} × {currentQ.multiplier}?
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
          style={{ padding: '6px', fontSize: '18px', width: '100px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '6px 12px', fontSize: '16px' }}>
          Check
        </button>
      </form>
      {feedback && <p className="quiz-feedback">{feedback}</p>}
    </div>
  );
}
