import { useMemo, useState } from 'react';
import type { Todo, Filters } from '../types';
import getFilteredTodos from '../utils/todoHelpers';
import Button from './primitives/Button';
import { cn } from '../lib/utils';
import SortableTodos from './SortableTodos';
import useTodoStore from '../stores/todoStore';

function FilterSection({
   filter,
   setFilter,
   className,
}: {
   filter: Filters;
   setFilter: (filter: Filters) => void;
   className?: string;
}) {
   return (
      <div
         className={cn(
            'flex items-center justify-center w-full gap-8',
            className
         )}
      >
         <Button
            key="all"
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
            className="bg-transparent"
         >
            All
         </Button>
         <Button
            key="active"
            isActive={filter === 'active'}
            onClick={() => setFilter('active')}
            className="bg-transparent"
         >
            Active
         </Button>
         <Button
            key="completed"
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
            className="bg-transparent"
         >
            Completed
         </Button>
      </div>
   );
}

export default function TodoList() {
   const clearCompleted = useTodoStore((s) => s.clearCompleted);
   const changeTodos = useTodoStore((s) => s.changeTodos);
   const todoList: Todo[] = useTodoStore((s) => s.todos);
   const [filter, setFilter] = useState<Filters>('all');

   const filteredTodos = useMemo(
      () => getFilteredTodos(todoList, filter),
      [todoList, filter]
   );

   function handleClearCompleted() {
      clearCompleted();
   }

   function getLeftCount(todos: Todo[]) {
      let count = 0;
      todos.forEach((todo) => (todo.completed ? count : count++));
      return count;
   }

   return (
      <div className="flex flex-col gap-10">
         <div className="flex flex-col rounded-sm w-full h-fit overflow-clip shadow-xl">
            <SortableTodos todos={filteredTodos} changeTodos={changeTodos} />
            <div className="flex justify-between bg-primary  h-[72px] ">
               <Button className="bg-transparent font-normal text-nowrap pl-6 text-xs disabled hover:cursor-default">
                  {getLeftCount(todoList)} items left
               </Button>
               <FilterSection
                  filter={filter}
                  setFilter={setFilter}
                  className="hidden md:flex"
               />
               <Button
                  className="bg-transparent font-normal text-nowrap pr-6 text-xs"
                  onClick={handleClearCompleted}
               >
                  Clear Completed
               </Button>
            </div>
         </div>
         <div className="flex content-center w-full h-[72px] bg-primary md:hidden rounded-sm overflow-clip shadow-xl">
            <FilterSection filter={filter} setFilter={setFilter} />
         </div>
      </div>
   );
}
