import React from 'react'
import './index.scss'
import { ThemeContext } from '../../App'
import { TodoColumn } from '../TodoColumn';
import { Todo, TodoContext, TodoProvider, TodoType } from './TodoContext';


export const ToDoContainer = () => {

  const themeContext = React.useContext(ThemeContext);


  return (
    <TodoProvider>
      <main id='todo-container' className={`todo-container ${themeContext.theme === 'dark' ? 'todo-container_dark' : 'todo-container_light'}`}>
        <h2 className='text-center todo-container__header'>Список дел</h2>
        <div className='todo-container__columns'>
          <TodoColumn header='Запланированные' todoType='inPlan'/>
          <TodoColumn header='В процессе' todoType='inProgress' />
          <TodoColumn header='Завершенные' todoType='completed' />
        </div>
      </main>
    </TodoProvider>
  )
}
