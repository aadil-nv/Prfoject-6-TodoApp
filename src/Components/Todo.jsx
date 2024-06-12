import React from 'react'
import todo_icon from "../assets/todo_icon.png";
import TodoItems from './TodoItems';

const Todo = () => {
  return (
    <div className="bg-white  place-self-center w-6/12 max-w-md flex flex-col p-5 min-h-[550px] rounded-xl">
      {/* --------------title------------- */}

      <div className=" flex items-center mt-7 gap-2">
        <img src={todo_icon} alt="" className="w-8"></img>
        <h1 className="text-3xl font-semibold "> To-Do-List</h1>
      </div>

      {/* --------------title------------- */}

      {/* --------------input box------------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-10 pr-2 pl-4 placeholder:text-slate-600"
          type="text"
          placeholder="Add your Task"
        />
        <button
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-
        m cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------------input box------------- */}

      {/* --------------Todo list------------- */}
      <div>
        <TodoItems text='Learn COding'/>
        <TodoItems text='Learn coding from AADIL'/>
      </div>
      {/* --------------Todo list------------- */}
    </div>
  );
}

export default Todo
