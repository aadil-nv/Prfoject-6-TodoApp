import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({text,id,isComplete,deleteTodo}) => {
  return (
    <div className='flex iten-center my-3 gap-2 '>
      <div className='flex flex-1 items-center cursor-pointer'>
        <img src={tick} alt=""  className='w-4' />
        <p className='text-slate-700 ml-4 text-[17px'>{text}</p>
      </div>
      <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-4 cursor-pointerb'/>
    </div>
  )
}

export default TodoItems
