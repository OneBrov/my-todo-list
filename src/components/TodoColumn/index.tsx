import React from 'react';

import './index.scss';

import { TodoItem } from '../TodoItem';
import { ThemeContext } from '../../App';
import { ColumnHeader } from './ColumnHeader';
import { TodoContext, TodoType } from '../TodoContainer/TodoContext';


export interface TodoColumnProps {
    header: string;
    todoType: TodoType;
}

export const TodoColumn:React.FC<TodoColumnProps> = ({
  header, todoType, 
}) => {

  const {theme} = React.useContext(ThemeContext);
  const {isTodoDragging} = React.useContext(TodoContext);

  const todoList = React.useContext(TodoContext).todos[todoType];
  return (
    <article
      data-todotype={todoType}
      className={[
        'column', 
        ...[theme === 'dark' ? 'column_dark' : 'column_light'],
        ...[isTodoDragging && 'column_droppable' ]
      ].join(' ')
      }
    >
      <ColumnHeader header={header} todoType={todoType} />
      <section className='column__items'>
        {todoList.map(todo => 
          <TodoItem key={todo.id} todo={todo} todoType={todoType}/> 
        )}
            
      </section>

    </article>
  );
};
