import React, { useState } from 'react';

const ClickCounterApp = () => {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [history, setHistory] = useState([]);
  const clickSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

  const playSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  const logAction = (action) => {
    const timestamp = new Date().toLocaleTimeString();
    setHistory(prev => [`[${timestamp}] ${action}`, ...prev]);
  };

  const increment = () => {
    if (count < limit) {
      const newCount = count + 1;
      setCount(newCount);
      logAction(`Increased to ${newCount}`);
      playSound();
    }
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      logAction(`Decreased to ${newCount}`);
      playSound();
    }
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
    logAction("Counter reset");
    playSound();
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLimit(value);
      logAction(`Limit set to ${value}`);
    }
  };

  const message = count === limit ? "🎉 You've reached the limit!" : "";

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🎯 Click Counter</h1>

        <div style={styles.limitInput}>
          <label style={styles.label}>
            Set Limit:
            <input
              type="number"
              value={limit}
              onChange={handleLimitChange}
              style={styles.input}
              min="0"
            />
          </label>
        </div>

        <div style={styles.counter}>{count}</div>

        <div style={styles.buttons}>
          <button style={styles.button} onClick={increment}>➕ Increase</button>
          <button style={styles.button} onClick={decrement} disabled={count === 0}>➖ Decrease</button>
          <button style={{ ...styles.button, backgroundColor: '#ffdddd' }} onClick={reset}>🔄 Reset</button>
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.history}>
          <h3 style={styles.historyHeading}>📜 History Log</h3>
          <ul style={styles.historyList}>
            {history.map((entry, i) => (
              <li key={i} style={styles.historyItem}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  app: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  card: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    padding: '30px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  limitInput: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    color: '#444',
  },
  input: {
    marginLeft: '10px',
    padding: '6px 10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '70px',
  },
  counter: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    flex: 1,
    padding: '12px 0',
    fontSize: '1rem',
    backgroundColor: '#e0f7fa',
    color: '#00796B',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease-in-out',
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#e53935',
  },
  history: {
    textAlign: 'left',
    marginTop: '30px',
  },
  historyHeading: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  historyList: {
    listStyleType: 'none',
    padding: 0,
    maxHeight: '150px',
    overflowY: 'auto',
  },
  historyItem: {
    fontSize: '0.9rem',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
};

export default ClickCounterApp;
