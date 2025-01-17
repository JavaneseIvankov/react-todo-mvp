import './output.css';
import { useReducer } from 'react';
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

function App() {
   const [todos, dispatch] = useReducer(TodoReducer, initialTodos);

   return (
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
   );
}

export default App;
