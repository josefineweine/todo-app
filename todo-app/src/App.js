import React from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <Todo />
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Todo App</p>
      </footer>
    </div>
  );
}

export default App;
