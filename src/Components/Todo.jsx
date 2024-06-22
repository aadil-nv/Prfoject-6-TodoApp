import React, { useRef, useState, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') {
      return null;
    }
    
    // Validation for input length and symbols
    if (inputText.length < 2) {
      toast.error('Please enter at least two characters.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    // Regex to check if inputText contains only symbols
    const symbolRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (symbolRegex.test(inputText)) {
      toast.error('Input should contain alphanumeric characters.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    if (todoList.some((todo) => todo.text === inputText)) {
      toast.error('Todo already exists', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  const editTodo = (id, newText) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-white place-self-center max-w-lg flex flex-col p-5 min-h-[550px] rounded-xl' style={{ width: '500px', height: '600px', fontFamily: 'unset' }}>
      <div className='flex items-center justify-center mt-7 gap-2'>
        <img src={todo_icon} alt='' className='w-8' />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-10 pr-2 pl-4 placeholder:text-slate-600'
          type='text'
          placeholder='Add your Task'
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-m cursor-pointer'
          style={{ backgroundColor: '#36a84d' }}
        >
          ADD
        </button>
      </div>

      <div>
        {todoList.map((item, index) => (
          <TodoItems
            key={index}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        ))}
      </div>
      <ToastContainer position='bottom-right' autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Todo;
