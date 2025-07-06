import { useState, useEffect } from 'react';

export default function Quiz({ selectedTables, numQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [quizKey, setQuizKey] = useState(0); // Forces reset

  // Generate questions whenever quizKey changes (restart) or props change
  useEffect(() => {
    const newQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      const tableNum = selectedTables[Math.floor(Math.random() * selectedTables.length)];
      const multiplier = Math.floor(Math.random() * 12) + 1; // 1–12
      newQuestions.push({ tableNum, multiplier, answer: tableNum * multiplier });
    }

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setUserAnswer('');
    setScore(0);
    setQuizOver(false);
    setFeedback('');
  }, [quizKey, selectedTables, numQuestions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentQ = questions[currentIndex];
    if (userAnswer.trim() === '') {
      setFeedback('Please enter an answer.');
      return;
    }

    const isCorrect = Number(userAnswer) === currentQ.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Wrong! The answer is ${currentQ.answer}`);
    }

    setTimeout(() => {
      setFeedback('');
      setUserAnswer('');

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizOver(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setQuizKey((prev) => prev + 1); // Triggers full quiz reset
  };

  if (quizOver) {
    const accuracy = ((score / questions.length) * 100).toFixed(1);
    return (
      <div>
        <h3>🎉 Quiz Completed!</h3>
        <p>
          Your score: {score} / {questions.length} ({Math.min(accuracy, 100)}%)
        </p>
        <button onClick={handleRestart} style={{ padding: '10px 20px', marginTop: '10px' }}>
          🔄 Restart Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <p>Loading quiz...</p>;

  const currentQ = questions[currentIndex];

  return (
    <div>
      <p className="quiz-question" style={{ fontSize: '18px', marginBottom: '10px' }}>
        Question {currentIndex + 1} of {questions.length}: What is{' '}
        <strong>{currentQ.tableNum} × {currentQ.multiplier}</strong>?
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
          style={{
            padding: '6px',
            fontSize: '18px',
            width: '100px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '6px 12px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check
        </button>
      </form>
      {feedback && (
        <p className="quiz-feedback" style={{ marginTop: '10px', fontWeight: 'bold' }}>
          {feedback}
        </p>
      )}
    </div>
  );
}
