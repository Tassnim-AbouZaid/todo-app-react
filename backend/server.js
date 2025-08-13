// backend/server.js
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// In-memory tasks array
let tasks = [];
let idCounter = 1;


// ✅ Helper: Validate task input
function validateTaskInput(title) {
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return 'Task title is required and must be a non-empty string.';
  }
  return null;
}


// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});


// 📌 Read All Tasks (GET)
app.get('/tasks', (req, res) => {
  console.log(chalk.blue('✅ tasks was hit'));
  res.json(tasks);
});


// 📌 Create Task (POST)
app.post('/tasks', (req, res) => {
  const error = validateTaskInput(req.body.title);
  if (error) {
    return res.status(400).json({ error });
  }
  const newTask = { id: idCounter++, title: req.body.title.trim(), completed: false };
  tasks.push(newTask);
  console.log(chalk.green(`Task added: ${title}`));
  res.status(201).json(newTask);
});


// ✅ Put update task completion or title
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const error = validateTaskInput(req.body.title);
  if (error) {
    return res.status(400).json({ error });
  }
  task.title = req.body.title.trim();
  task.completed = req.body.completed ?? task.completed;
  console.log(chalk.yellow(`Task updated: ID ${id}`));
  res.json(task);
});


// ✅ DELETE remove a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  console.log(chalk.red(`Task deleted: ID ${id}`));
  res.status(204).send();
});


// 📌 Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});


// 📌 Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unexpected Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start server
app.listen(PORT, () => {
console.log(chalk.green(`✅ Server running on http://localhost:${PORT}`));
});
