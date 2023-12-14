// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';

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
    <div>
      <h1>Todo List</h1>

      {/* Formulário para adicionar novas tarefas */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Lista de tarefas */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id, editingTodoText)}>Salvar</button>
              </>
            ) : (
              <>
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
                <button onClick={() => startEditingTodo(todo.id, todo.text)}>
                  Alterar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;