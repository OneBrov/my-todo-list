import React from 'react'
import { ThemeContext } from '../../App';
import { Todo, TodoContext, TodoType } from '../TodoContainer/TodoContext';

interface TodoItemWrapperProps {
    children: React.ReactNode;
    todoType: TodoType;
    todo: Todo;
    isInputDisabled?: boolean
}

export const TodoItemWrapper:React.FC<TodoItemWrapperProps> = ({
    children,
    todoType,
    todo,
    isInputDisabled
}) => {

  const {theme} = React.useContext(ThemeContext);
  const todoContext = React.useContext(TodoContext);
  
  const [targetType, setTargetType] = React.useState<TodoType>(); 

  const [mouseMoveFunction, setMoveMoveFunction] = React.useState<(event: React.MouseEvent<Element, MouseEvent>)=> void>();
  
  const todoItemRef = React.useRef<HTMLDivElement>(null);

  function handleMouseDown(event: React.MouseEvent) {
    if (!isInputDisabled) return;

    //prevent default text selection while dragging item
    event.preventDefault();

    const item = todoItemRef.current as HTMLDivElement;

    if (item === null) return;
  
    //possible target for drop
    let currentDroppable = null as any;

    //change context state for highlight possible targets
    todoContext.changeIsDragging(true);

    let shiftX = event.clientX - item.getBoundingClientRect().left;
    let shiftY = event.clientY - item.getBoundingClientRect().top;
    
    //style element for dragging
    item.style.width = item.clientWidth + 'px';
    item.style.position = 'absolute';
    item.style.zIndex = '1000';
    item.style.cursor = 'grabbing';

    //move element to x, y
    function moveAt(pageX: number, pageY: number) {
      item.style.left = pageX - shiftX + 'px';
      item.style.top = pageY - shiftY + 'px';
    }

    //if we dragging element handle mouse move
    function onMouseMove(event: React.MouseEvent<Element, MouseEvent>) {
      moveAt(event.pageX, event.pageY);

      //check element bellow cursor
      item.style.display = 'none';
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      item.style.display = 'flex';

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.column_droppable');

      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) { 
          //call if leave droppable element
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;

        if (currentDroppable) { 
          // call if enter droppable element
          enterDroppable(currentDroppable);
        }
      }
    }

    //handle tracking mouse on the root (document)
    document.addEventListener('mousemove', onMouseMove as any);
    setMoveMoveFunction(mouseMoveFunction);

    function enterDroppable(elem: HTMLElement) {
        //get value from attribute of droppable element
        const tType = elem.getAttribute('data-todotype') as TodoType;
        setTargetType(tType);

        //highlight droppable element
        elem.style.boxShadow = '-0px -0px 10px #418179, 0px 0px 10px #71e1d3';

      }
    
      function leaveDroppable(elem: HTMLElement) {
        //remove highlight
        elem.style.boxShadow= 'none';
        setTargetType(undefined)
      }
    
  }

  //if mouse up end dragging
  function handleMouseUp(e: React.MouseEvent) {
    const item = todoItemRef.current as HTMLDivElement;

    document.removeEventListener('mousemove', mouseMoveFunction as any);

    //move dragged item to new array
    todoContext.moveCurrentItem(todoType, targetType, todo);


    //return element styling to default
    item.style.position = '';
    item.style.zIndex = '';
    item.style.width = '';
    item.style.left = '';
    item.style.top = '';
    item.style.cursor = '';
    
    //remove target when drag end
    setTargetType(undefined);

    todoContext.changeIsDragging(false);
  }

  return (
    <div 
        ref={todoItemRef}  
        className={`column__item ${theme === 'dark' ? 'column__item_dark' : 'column__item_light'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragStart={()=>false}
    >
        {children}
    </div>
  )
}
