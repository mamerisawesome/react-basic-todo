import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="green darken-4">
          <div className="container">Magic Todo</div>
        </nav>
      </header>

      <main className="container">
        <h1>Magic To-do</h1>
        <TodoList />
      </main>
    </div>
  );
}

export default App;
