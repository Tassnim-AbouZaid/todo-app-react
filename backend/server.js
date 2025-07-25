// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});
app.get('/api/tasks', (req, res) => {
    const sampleTasks = [
      { id: 1, title: 'Learn React', completed: true },
      { id: 2, title: 'Build a project', completed: false },
    ];
    res.json(sampleTasks);
  });
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});