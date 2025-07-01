import './styles.css';
import { useState } from 'react';
import Quiz from './components/Quiz';

export default function App() {
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [selectedTables, setSelectedTables] = useState([1]); // array of selected tables, default to [1]
  const [numQuestions, setNumQuestions] = useState(10);
  const [quizKey, setQuizKey] = useState(0); // to reset quiz

  // Handle checkbox change
  const toggleTable = (tableNum) => {
    setSelectedTables((prev) => {
      if (prev.includes(tableNum)) {
        // Remove tableNum
        return prev.filter((num) => num !== tableNum);
      } else {
        // Add tableNum
        return [...prev, tableNum];
      }
    });
  };

  const handleStartQuiz = () => {
    if (selectedTables.length === 0) {
      alert('Please select at least one table for the quiz.');
      return;
    }
    setMode('quiz');
    setQuizKey((prev) => prev + 1); // reset quiz component
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        color: '#000',
      }}
    >
      <h1>Multiplication Table Practice</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setMode('learn')}
          disabled={mode === 'learn'}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            cursor: mode === 'learn' ? 'default' : 'pointer',
          }}
        >
          📘 Learn Tables
        </button>
        <button
          onClick={() => setMode('quiz')}
          disabled={mode === 'quiz'}
          style={{
            padding: '10px 20px',
            cursor: mode === 'quiz' ? 'default' : 'pointer',
          }}
        >
          📝 Take Quiz
        </button>
      </div>

      {mode === 'learn' && (
        <>
          <p>Select a table to learn:</p>
          <div style={{ marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setSelectedTables([num])}
                style={{
                  marginRight: '6px',
                  padding: '8px 12px',
                  backgroundColor: selectedTables[0] === num ? '#4caf50' : '#e0e0e0',
                  color: selectedTables[0] === num ? '#fff' : '#000',
                  fontWeight: selectedTables[0] === num ? '700' : '400',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {num}
              </button>
            ))}
          </div>

          <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '18px', color: '#444', userSelect: 'none' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>
                {selectedTables[0]} × {i + 1} = {selectedTables[0] * (i + 1)}
              </li>
            ))}
          </ul>
        </>
      )}

      {mode === 'quiz' && (
        <>
          <div
            style={{
              marginBottom: '20px',
              maxHeight: '200px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'left',
            }}
          >
            <p style={{ marginBottom: '8px' }}>Select tables for quiz:</p>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <label
                key={num}
                style={{
                  display: 'inline-block',
                  width: '60px',
                  marginRight: '10px',
                  userSelect: 'none',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTables.includes(num)}
                  onChange={() => toggleTable(num)}
                  style={{ marginRight: '4px' }}
                />
                {num}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              Number of Questions:{' '}
              <input
                type="number"
                min="1"
                max="100"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                style={{ width: '60px' }}
              />
            </label>
          </div>

          <button
            onClick={handleStartQuiz}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Start Quiz
          </button>

          {/* Quiz component */}
          <Quiz
            key={quizKey} // reset quiz on new start
            selectedTables={selectedTables.length ? selectedTables : [1]} // fallback to 1 if none selected
            numQuestions={numQuestions}
          />
        </>
      )}
    </div>
  );
}
