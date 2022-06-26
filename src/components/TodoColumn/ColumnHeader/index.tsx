import React, {KeyboardEvent} from 'react'
import './index.scss'
import plus from '../../../assets/plus.svg'
import { TodoContext, TodoType } from '../../TodoContainer/TodoContext';

export interface ColumnHeaderProps {
    header: string;
    todoType: TodoType
}


export const ColumnHeader:React.FC<ColumnHeaderProps> = ({
    header,
    todoType,
}) => {

  const [todoText, setTodoText] = React.useState<string>('')

  const { addTodo } = React.useContext(TodoContext)

  function handleAddTodo() {
    if (!todoText) return;

    console.log('addTODO!!')

    const now = new Date();
    addTodo(todoType, {text: todoText, createAt: now.toString(), id: performance.now()})

    setTodoText('')
  }


  function handleEnterPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  }

  return (
    <div className='column__header'>
        <input placeholder={header} value={todoText} onKeyDown={handleEnterPress} onChange={(e) => setTodoText(e.target.value)} className='header__input' />
        <img onClick={handleAddTodo} className='header__button button' src={plus} width={24} height={24} alt={'Add todo task'}/>
    </div>
  )
}
