import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'; // Import your CSS file

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (taskText.trim() !== '') {
      try {
        await axios.post('/api/tasks', { task: taskText });
        setTaskText('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (index) => {
    try {
      await axios.delete(`/api/tasks/${index}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="Todo">
      <h2>My Todo List</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
