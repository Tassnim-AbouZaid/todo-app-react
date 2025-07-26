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
  console.log('✅ /api/tasks was hit');
    res.json ([
      { id: 1, title: 'Learn React', completed: true },
      { id: 2, title: 'Build a project', completed: false },
    ]);
  });
app.listen(PORT, () => {
  const chalk = require('chalk');
console.log(chalk.green(`✅ Server running on http://localhost:${PORT}`));
});
