import './output.css';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';
import type { Todo } from './types';
import Header from './components/Header';
import useTodoStore from './stores/todoStore';
import { useEffect } from 'react';

function App() {
   const todos: Todo[] = useTodoStore((s) => s.todos);
   const count: number = useTodoStore((s) => s.count);
   const changeTodos = useTodoStore((s) => s.changeTodos);

   useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      const savedCount = localStorage.getItem('count');
      if (savedTodos && savedCount) {
         changeTodos(JSON.parse(savedTodos), JSON.parse(savedCount));
      }
   }, [changeTodos]);

   useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('count', JSON.stringify(count));
   }, [todos, count]);

   return (
      <div className="font-josefin">
         {/* <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={dispatch}> */}
         <div className="font-josefin flex flex-col gap-10">
            <Header />
            <div className="w-[80%] mt-0 mr-auto ml-auto min-w-[260px] max-w-screen-sm flex flex-col gap-10">
               <InputBar />
               <TodoList />
            </div>
         </div>
         {/* </TodosDispatchContext.Provider>
         </TodosContext.Provider> */}

         <h2 className="mt-16 mb-16 text-center text-foreground/50">
            Drag and drop to reorder the list
         </h2>
      </div>
   );
}

export default App;
