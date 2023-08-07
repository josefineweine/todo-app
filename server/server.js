const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  if (task.trim() !== '') {
    tasks.push(task);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/api/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
