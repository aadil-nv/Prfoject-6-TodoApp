import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (editText.trim() !== "") {
      editTodo(id, editText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    toast.dark(
      <div className="toast-delete">
        <p className="delete-message">Are you deleting ?</p>
        <div className="delete-buttons">
          <button className="delete-confirm" onClick={() => confirmDelete(id)}>Confirm</button>
          <button className="delete-cancel" onClick={dismissToast}>Cancel</button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        closeButton: false,
        progress: undefined,
      }
    );
  };

  const confirmDelete = (id) => {
    deleteTodo(id);
    toast.success('Todo deleted successfully!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    toast.dismiss();
  };

  const dismissToast = () => {
    toast.dismiss();
    toast.info('Deletion canceled.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt="" className='w-4' />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="ml-4 bg-transparent border-b border-gray-400 outline-none text-slate-700 text-[17px] placeholder-slate-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit();
              }
            }}
          />
        ) : (
          <p className={`ml-4 text-slate-700 text-[17px] ${isComplete ? "line-through" : ""}`}>
            {text}
          </p>
        )}
      </div>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className='text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none border-none py-1 px-3 rounded-md transition duration-300 ease-in-out'
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        >
          <span>Edit</span>
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className='text-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none border-none py-1 px-3 rounded-md transition duration-300 ease-in-out'
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        >
          <span>Save</span>
        </button>
      )}
      <button
        onClick={handleDelete}
        className='text-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none border-none py-1 px-3 rounded-md transition duration-300 ease-in-out'
        style={{ marginLeft: '10px', cursor: 'pointer' }}
      >
        <span>Delete</span>
      </button>
    </div>
  );
};

export default TodoItems;
