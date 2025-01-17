import { useContext, useMemo, useState } from 'react';
import { TodosContext, TodosDispatchContext } from '../contexts/TodoContext';
import type { Todo, Filters } from '../types';
import getFilteredTodos from '../utils/todoHelpers';
import TodoItem from './TodoItem';
import Separator from './primitives/Separator';
import Button from './primitives/Button';
import { cn } from '../lib/utils';

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
   const dispatch = useContext(TodosDispatchContext);
   const todoList: Todo[] = useContext(TodosContext);
   const [filter, setFilter] = useState<Filters>('all');

   const filteredTodos = useMemo(
      () => getFilteredTodos(todoList, filter),
      [todoList, filter]
   );

   function handleClearCompleted() {
      dispatch?.({ type: 'CLEAR_COMPLETED' });
   }

   return (
      <div className="flex flex-col rounded-sm w-full h-fit overflow-clip shadow-xl">
         {filteredTodos.map((todo) => (
            <>
               <TodoItem key={todo.id} todo={todo}></TodoItem>
               <Separator
                  key={`separator-${todo.id}`}
                  orientation="horizontal"
                  className="h-[1px] bg-muted-foreground z-20"
               ></Separator>
            </>
         ))}
         <div className="flex justify-between bg-primary  h-[72px] ">
            <Button className="bg-transparent font-normal text-nowrap pl-6 text-xs disabled hover:cursor-default">
               {todoList.length} items left
            </Button>
            <FilterSection
               filter={filter}
               setFilter={setFilter}
               className="hidden md:flex"
            ></FilterSection>
            <Button
               className="bg-transparent font-normal text-nowrap pr-6 text-xs"
               onClick={handleClearCompleted}
            >
               Clear Completed
            </Button>
         </div>
         <div className="flex content-center w-full h-[72px] bg-primary md:hidden rounded-sm mt-10">
            <FilterSection
               filter={filter}
               setFilter={setFilter}
            ></FilterSection>
         </div>
      </div>
   );
}
