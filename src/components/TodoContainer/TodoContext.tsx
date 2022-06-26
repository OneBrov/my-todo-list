import React from 'react'

export type Todo = {
    id?: number;
    createAt: string;
    text: string;
}

export type TodoType = 'inPlan' | 'inProgress' | 'completed'
  
interface Todos {
    inProgress: Todo[];
    inPlan: Todo[];
    completed: Todo[];
}
  
interface TodoContextInterface {
    todos: Todos;
    isTodoDragging: boolean;
    addTodo: (todoType: TodoType, todo: Todo)=>void;
    removeTodo: (todoType: TodoType, todo: Todo) => void;
    moveCurrentItem: (fromType: TodoType, toType: TodoType | undefined, todo: Todo)=>void;
    changeIsDragging: (state: boolean) => void;

}

export const TodoContext = React.createContext<TodoContextInterface>({
    todos: {inProgress: [], inPlan: [], completed: []},
    isTodoDragging: false,
    addTodo: ()=>console.log('Not implemented'),
    removeTodo: ()=>console.log('Not implemented'),
    moveCurrentItem: ()=>console.log('Not implemented'),
    changeIsDragging: () => console.log(),

});

export const TodoProvider:React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [todos, setTodos] = React.useState<Todos>({
        inProgress: [],
        inPlan: [],
        completed: [],
    });
    
    const [isTodoDragging, setIsTodoDragging] = React.useState<boolean>(false);

    React.useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        if (!localTodos) return;
        const savedTodos = JSON.parse(localTodos);
        console.log(savedTodos)
        setTodos(savedTodos);
    }, []);

    // React.useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }, [todos]);
    

    window.onbeforeunload = function() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


    function changeIsDragging(state: boolean) {
        setIsTodoDragging(state);
    }

    function moveCurrentItem(fromType:TodoType, toType: TodoType | undefined, todo: Todo) {
        if (!fromType || !toType || toType === fromType) return;

        setTodos(prev => {
            return {
                ...prev, 
                [toType]: [...prev[toType], todo], 
                [fromType]: [...prev[fromType].filter(t => t !== todo)]
            }
        })
        
    }

    function addTodo(todoType: TodoType, todo: Todo) {
      const newTodos = {...todos, [todoType]: [...todos[todoType], todo]};
      setTodos(newTodos);

      localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    function removeTodo(todoType: TodoType, todo: Todo) {
        setTodos(prev => {
            return {...prev, [todoType]: [...prev[todoType].filter(t => t !== todo)]}
        });
    }

  return (
    <TodoContext.Provider value={{
        todos: todos, 
        isTodoDragging: isTodoDragging,
        addTodo: addTodo,
        removeTodo: removeTodo,
        moveCurrentItem: moveCurrentItem,
        changeIsDragging,

    }}>
        {children}
    </TodoContext.Provider>
  )
}
