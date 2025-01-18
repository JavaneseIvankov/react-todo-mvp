import React, {
   forwardRef,
   useContext,
} from 'react';
import type { Todo } from '../types';
import CheckBox from './primitives/CheckBox';
import IconCross from '../assets/icons/icon-cross';
import { TodosDispatchContext } from '../contexts/TodoContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../lib/utils';

interface TodoItemProps {
   todo: Todo;
   className?: string;
}

const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
   ({ todo, className }, ref) => {
      const { attributes, listeners, setNodeRef, transform, transition } =
         useSortable({ id: todo.id });

      const style = {
         transform: CSS.Transform.toString(transform),
         transition,
      };

      const dispatch = useContext(TodosDispatchContext);
      const handleTodoToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
         dispatch?.({
            type: 'TOGGLE_TODO',
            payload: { id: todo.id, completed: e.target.checked },
         });
      };

      const handleTodoDelete = () => {
         dispatch?.({
            type: 'DELETE_TODO',
            payload: { id: todo.id },
         });
      };

      return (
         <div className={cn("group flex h-fit items-center content-center w-full bg-primary justify-between relative", className)} ref={setNodeRef} style={style}>
            <div key="drag-handle" className='opacity-0 bg-yellow absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-9/12 h-full'  {...attributes} {...listeners}/>
            <div className="flex items-center content-center">
               <CheckBox
                  ref={ref}
                  onChange={handleTodoToggle}
                  checked={todo.completed}
                  setChecked={() => (todo.completed = !todo.completed)}
               />
               {todo.completed ? (
                  <h1 className="text-muted-foreground block text-wrap h-full ">
                     <s>{todo.text}</s>
                  </h1>
               ) : (
                  <h1 className="text-foreground block text-wrap">
                     {todo.text}
                  </h1>
               )}
            </div>
            <button
               onClick={handleTodoDelete}
               className="hidden group-hover:block p-6"
            >
               <IconCross/>
            </button>
         </div>
      );
   }
);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
