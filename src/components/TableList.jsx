import React from 'react';

export default function TableList({ onSelectTable }) {
  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px',
        justifyContent: 'center',
      }}
    >
      {tables.map((num) => (
        <button
          key={num}
          onClick={() => onSelectTable(num)}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            fontSize: '16px',
            minWidth: '80px',
          }}
        >
          Table {num}
        </button>
      ))}
    </div>
  );
}

