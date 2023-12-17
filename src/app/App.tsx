// src/App.tsx
import React, { useState, useEffect } from 'react';
import Routes from './routes';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, { id: data.id, text: inputText, completed: false }]))
      .catch((error) => console.error('Error adding todo:', error));

    setInputText('');
  };

  const removeTodo = (id: number) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error('Error removing todo:', error));
  };

  const updateTodo = (id: number, newText: string) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText, completed: todos.find((todo) => todo.id === id)?.completed }),
    })
      .then((response) => response.json())
      .then(() => setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))))
      .catch((error) => console.error('Error updating todo:', error));

    // Limpa o estado de edição
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const toggleCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todoToUpdate.text, completed: todoToUpdate.completed }),
      })
        .catch((error) => console.error('Error toggling completion:', error));
    }
  };

  const startEditingTodo = (id: number, text: string) => {
    // Define o estado de edição com os valores iniciais
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;