import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete

  // 🔁 Fetch tasks from Express backend
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks') 
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.map(task => ({
          ...task,
          text: task.title, // 🛠️ Map 'title' to 'text'
        }));
        setTasks(formattedTasks);
      })
      .catch((err) => console.error('❌ Error fetching tasks:', err));
  }, []);

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        id: Date.now(),
        text: input.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });


  return (
    <div className="app-container">
      <h1>📝 Tassnim's To-Do List</h1>

      <h2 className="task-counter">
        ✅ Completed: {tasks.filter(task => task.completed).length} / {tasks.length}
      </h2>

      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New Task"
        />
        <button className="button" onClick={addTask}>➕ Add</button>
      </div>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={`button ${filter === 'all' ? 'button-active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`button ${filter === 'completed' ? 'button-active' : ''}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          className={`button ${filter === 'incomplete' ? 'button-active' : ''}`}
        >
          Incomplete
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}>
                ✅ {task.text} - {task.completed ? 'Done' : 'Pending'}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;