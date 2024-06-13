import React, { useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id)=>{
    setTodoList((prvTodos)=>{
        return prvTodos.filter((todo)=>todo.id !== id)
    })
  }

  return (
    <div className="bg-white  place-self-center w-6/12 max-w-md flex flex-col p-5 min-h-[550px] rounded-xl">
      {/* --------------title------------- */}

      <div className=" flex items-center mt-7 gap-2">
        <img  src={todo_icon} alt="" className="w-8"></img>
        <h1 className="text-3xl font-semibold "> To-Do List</h1>
      </div>

      {/* --------------title------------- */}

      {/* --------------input box------------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-10 pr-2 pl-4 placeholder:text-slate-600"
          type="text"
          placeholder="Add your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-m cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------------input box------------- */}

      {/* --------------Todo list------------- */}
      <div>
        {todoList.map((item , index)=>{
            return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo}/>
        })}
        
      </div>
      {/* --------------Todo list------------- */}
    </div>
  );
};

export default Todo;
