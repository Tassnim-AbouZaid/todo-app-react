import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete

  // 🔁 Fetch tasks from Express backend
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks') 
      .then((res) => res.json())
      .then((data) => setTasks(data))
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

  const buttonStyle = {
    margin: '5px',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📝 Tassnim's To-Do List</h1>

      {/* Task Completion Counter */}
      <h2>
        ✅ Completed: {tasks.filter(task => task.completed).length} / {tasks.length}
      </h2>

      {/* Input + Add Button */}
      <div style={{ marginBottom: '15px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New Task"
          style={{ padding: '8px', width: '200px', marginRight: '8px' }}
        />
        <button style={buttonStyle} onClick={addTask}>➕ Add</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setFilter('all')}
          style={filter === 'all' ? activeButtonStyle : buttonStyle}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={filter === 'completed' ? activeButtonStyle : buttonStyle}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          style={filter === 'incomplete' ? activeButtonStyle : buttonStyle}
        >
          Incomplete
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginLeft: '8px'
              }}>
               ✅ {task.title}  - {task.completed ? 'Done' : 'Pending'}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;