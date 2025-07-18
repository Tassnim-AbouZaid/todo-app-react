import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tassnim's To-Do List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
