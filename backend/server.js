// backend/server.js
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
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
console.log(chalk.green(`✅ Server running on http://localhost:${PORT}`));
});
