import React, { Suspense } from 'react';

import './index.scss';
import more from '../../assets/more.svg';
import edit from '../../assets/edit.svg';
import trash from '../../assets/trash.svg';
import { ThemeContext } from '../../App';
import { Todo, TodoContext, TodoType } from '../TodoContainer/TodoContext';
import { TodoItemWrapper } from '../TodoItemWrapper';

export interface TodoItemProps {
  todo: Todo;
  todoType: TodoType;
}

export const TodoItem:React.FC<TodoItemProps> = ({
  todo, 
  todoType
}) => {


  const todoContext = React.useContext(TodoContext);

  const [todoInput, setTodoInput] = React.useState<string>(todo.text);
  const [isInputDisabled, setIsInputDisabled] = React.useState<boolean>(true);
  const [tipVisible, setTipVisible] = React.useState<boolean>(false);
  const [isTipPinned, setIsTipPinned] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleTodoEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
    todo.text = e.target.value;
  }

  function handleStartEditing() {
    if (!inputRef.current) return;
    setIsInputDisabled(false);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  function handleEndEditing() {
    setIsInputDisabled(true);
  }

  function handleEnterDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleEndEditing();
    }
  }

  function handleShowTip() {
    setTipVisible(true);
  }

  function handleHideTip() {
    if (!isTipPinned) {
      setTipVisible(false);
    }
  }

  function handleDeleteClick(e: React.MouseEvent) {
    todoContext.removeTodo(todoType, todo);
  }

  function handlePreventDragging(e: React.MouseEvent) {
    e.stopPropagation();
  } 


  function togglePinned() {
    setIsTipPinned(prev => !prev);
  }

  function getDaysAfterCreation() {
    const now = new Date();
    const days = Math.floor((now.getTime() - new Date(todo.createAt).getTime()) / 86400000);
    if (days === 1) {
      return `${days} day ago`;
    }
    return `${days} days ago`;
  }

  return (
    <TodoItemWrapper todoType={todoType} todo={todo} isInputDisabled={isInputDisabled}>
      <div className='item__images item__moreContainer'>
        <img 
          className={`button item__button item__button_more ${isTipPinned ? 'more_pinned' : ''}`} 
          src={more} 
          width={16} 
          height={16} 
          alt={'More info'} 
          onClick={togglePinned} 
          onMouseEnter={handleShowTip} 
          onMouseLeave={handleHideTip}
          onMouseDown={handlePreventDragging}
        />
        <div className={`more__description ${tipVisible ? 'more__description_visible' : ''}`} >
          <b>Дата создания: </b>
          <p>{getDaysAfterCreation()}</p>
          <b>Содержание: </b>
          <p>{todo.text}</p>
        </div>
      </div>
      <input 
        id={todo.id.toString()}
        aria-label='todo item current text'
        className='item__text' 
        ref={inputRef} 
        disabled={isInputDisabled} 
        type='text'
        name='todo-text'
        value={todo.text} 
        onChange={handleTodoEdit} 
        onBlur={handleEndEditing} 
        onKeyDown={handleEnterDown}
      />
    
      <div className='item__images'>
        <img 
          className={`button item__button item__button_edit ${!isInputDisabled ? 'item__button_editing' :''}`} 
          src={edit} 
          width={16} 
          height={16} 
          alt={'Edit task'}
          onClick={handleStartEditing} 
          onMouseDown={handlePreventDragging}
        />
        <img 
          className='button item__button item__button_trash' 
          src={trash} 
          width={16} 
          height={16} 
          alt={'Delete task'}
          onClick={handleDeleteClick}  
          onMouseDown={handlePreventDragging}
        />
      </div>
    </TodoItemWrapper>

  );
};
