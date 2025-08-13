import './style.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete

  // 🔁 Fetch tasks from Express backend
  useEffect(() => {
    fetchTasks();
  }, []);
        const fetchTasks = async () => {
          try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('❌ Error fetching tasks:', err);
      }
    };
  
  
  
   // ➕ Add task and send to backend
   const addTask = async () => {
    if (!input.trim()) {

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.trim() }),
      });

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setInput('');
     } catch (err) {
      console.error('❌ Error adding task:', err);
     }
   } 
  };

  // 🔄 Toggle complete on backend
  const toggleComplete = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });

      const updatedTask = await res.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      console.error('❌ Error updating task:', err);
    }
  };

  // Delete task from backend
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { 
        method: 'DELETE',
       });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('❌ Error deleting task:', err);
    }
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
                onChange={() => toggleComplete(task.id, task.completed)}
                />
                <span style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}>
                 {task.text} - {task.completed ? 'Done' : 'Pending'}
              </span>
            </label>
            
            <button>
              className="button button-delete"
              style={{ marginLeft: '10px' }}
              onClick={() => deleteTask(task.id)}
              ❌ Delete
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;