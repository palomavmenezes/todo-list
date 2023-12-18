// src/pages/Lista.tsx
import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Lista: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => alert('Error fetching todos:'));
  }, []);

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
        body: JSON.stringify({
          text: todoToUpdate.text,
          completed: todoToUpdate.completed,
        }),
      })
        .catch((error) => alert('Erro na conclusão da alternância:'));
    }
  };

  return (
    <div>
      {/* Lista de tarefas */}
      <div className='mx-auto flex flex-shrink-0 items-center justify-center bg-purple-200 -mt-5 p-5 rounded md:w-1/2 lg:w-1/2 xl:w-1/2 sm:w-10/12'>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label className='check-customized'>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
              </label>
              <div>
                <span className={todo.completed ? 'completed px-2 text-gray-400 text-lg' : 'px-2 text-lg'}>
                  {todo.text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lista;
