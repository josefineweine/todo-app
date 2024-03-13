import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <li>
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={() => onToggleComplete(todo.id)}>{todo.completed ? 'Oklar' : 'Klar'}</button>
      <button onClick={() => onDelete(todo.id)}>Ta bort</button>
    </li>
  );
};

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Skriv in en ny todo"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Lägg till</button>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://random-todos.azurewebsites.net/todos?apikey=$2a$10$UkP9ReLcjxRhLFzLN14KGOh0wjZTOKXx4WFYCfLOWZiCglX1B1Evq')
      .then(response => {
        setTodos(response.data.slice(0, 3)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = (text) => {
    const newTodo = {
      id: todos.length + 1, 
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput onAddTodo={handleAddTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <TodoItem
              key={index} 
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;