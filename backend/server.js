// backend/server.js
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake in-memory DB
let tasks = [
  { id: 1, title: 'Learn React', completed: true },
  { id: 2, title: 'Build a project', completed: false }
];

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});

// ✅ GET all tasks
app.get('/api/tasks', (req, res) => {
  console.log('✅ /api/tasks was hit');
  console.log(chalk.blue('GET /api/tasks'));
  res.json(tasks);
});

// ✅ POST create a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  console.log(chalk.green(`Task added: ${title}`));
  res.status(201).json(newTask);
});

// ✅ PATCH update task
app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  console.log(chalk.yellow(`Task updated: ID ${id}`));
  res.json(task);
});

// ✅ DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deleted = tasks.splice(index, 1);
  console.log(chalk.red(`Task deleted: ID ${id}`));
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
console.log(chalk.green(`✅ Server running on http://localhost:${PORT}`));
});
