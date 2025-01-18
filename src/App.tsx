import './output.css';
import { useEffect, useReducer } from 'react';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';
import TodoReducer from './reducers/todoReducer';
import { TodosContext, TodosDispatchContext } from './contexts/TodoContext';
import type { Todo } from './types';
import Header from './components/Header';

const initialTodos: Todo[] = [
   {
      id: 1,
      text: 'Learn React',
      completed: false,
   },
   {
      id: 2,
      text: 'Learn Vue',
      completed: false,
   },
   {
      id: 3,
      text: 'Learn Angular',
      completed: false,
   },
];

const initialState = {
   todos: initialTodos,
   count: initialTodos.length,
};

function App() {
   const [{ todos, count }, dispatch] = useReducer(TodoReducer, initialState);

   useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      const savedCount = localStorage.getItem('count');
      if (savedTodos && savedCount) {
         dispatch({
            type: 'CHANGE_TODOS',
            payload: {
               todos: JSON.parse(savedTodos),
               count: JSON.parse(savedCount),
            },
         });
      }
   }, []);


   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('count', JSON.stringify(count));
   }, [todos, count]);

   return (
      <div className="font-josefin">
         <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={dispatch}>
               <div className="font-josefin flex flex-col gap-10">
                  <Header />
                  <div className="w-[80%] mt-0 mr-auto ml-auto min-w-[260px] max-w-screen-sm flex flex-col gap-10">
                     <InputBar />
                     <TodoList />
                  </div>
               </div>
            </TodosDispatchContext.Provider>
         </TodosContext.Provider>

         <h2 className="mt-16 mb-16 text-center text-foreground/50">
            Drag and drop to reorder the list
         </h2>
      </div>
   );
}

export default App;
