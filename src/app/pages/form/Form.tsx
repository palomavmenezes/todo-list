// src/app/pages/Form.tsx
import React, { useState, useEffect } from 'react';
import '../../../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Form: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => alert('Erro ao obter todos:'));
  }, []);

  const addTodo = () => {
    if (inputText.trim() === '' || inputText.length > 30) {
      alert('Erro ao adicionar uma tarefa: O texto não deve estar vazio e deve ter no máximo 30 caracteres.');
      return;
    }

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, { id: data.id, text: inputText, completed: false }]))
      .catch((error) => alert('Erro ao adicionar uma tarefa:'));

    setInputText('');
  };

  const removeTodo = (id: number) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => alert('Erro ao remover a tarefa:'));
  };

  const updateTodo = (id: number, newText: string) => {
    if (newText.trim() === '' || newText.length > 30) {
      alert('Erro ao atualizar todo: O texto não deve estar vazio e deve ter no máximo 30 caracteres.');
      return;
    }

    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newText,
        completed: todos.find((todo) => todo.id === id)?.completed,
      }),
    })
      .then((response) => response.json())
      .then(() =>
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          )
        )
      )
      .catch((error) => alert('Erro ao atualizar a tarefa:'));

    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const cancelEditing = () => {
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
        body: JSON.stringify({
          text: todoToUpdate.text,
          completed: todoToUpdate.completed,
        }),
      })
        .catch((error) => alert('Erro na conclusão da alternância:'));
    }
  };

  const startEditingTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  return (
    <div>
      <div className='mx-auto flex flex-shrink-0 items-center justify-center bg-purple-200 -mt-5 p-5 rounded md:w-1/2 lg:w-1/2 xl:w-1/2 sm:w-10/12'>
        <div>
          <p className='w-full mt-5'>Adicione abaixo o nome da Tarefa:</p>

          <form
            className='mb-5'
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, 30))}
              maxLength={30}
            />
            <button className='bg-purple-700 px-3 text-white btn' type="submit">Adicionar Tarefa</button>
          </form>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  className='checkbox-customization'
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      className='text-black-500'
                      value={editingTodoText}
                      onChange={(e) => setEditingTodoText(e.target.value.slice(0, 30))}
                      maxLength={30}
                    />
                    <button className='text-green-500 mr-2 text-xl -mt-1' onClick={() => updateTodo(todo.id, editingTodoText)}>
                      <FontAwesomeIcon className='text-xs' icon={faCheck} />
                    </button>
                    <button className='text-red-500 text-xl -mt-1' onClick={cancelEditing}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <span className={todo.completed ? 'completed px-2 text-gray-400 text-lg' : 'px-2 text-lg'}>
                        {todo.text}
                      </span>
                    </div>
                    <button className='text-purple-900 mr-2 text-xl -mt-1' onClick={() => startEditingTodo(todo.id, todo.text)}>
                      <FontAwesomeIcon className='text-xs' icon={faEdit} />
                    </button>
                    <button className='text-red-600 text-xl -mt-1' onClick={() => removeTodo(todo.id)}>
                      <FontAwesomeIcon className='text-xs' icon={faTrash} />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;
