import React, {
   forwardRef,
   useContext,
   type HTMLInputTypeAttribute,
} from 'react';
import type { Todo } from '../types';
import CheckBox from './primitives/CheckBox';
import IconCross from '../assets/images/icon-cross';
import { TodosDispatchContext } from '../contexts/TodoContext';

interface TodoItemProps {
   todo: Todo;
}

// export default function TodoItem({ todo }: TodoItemProps) {
const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
   ({ todo }, ref) => {
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
         <div className="group flex h-fit items-center content-center w-full bg-primary justify-between">
            <div className="flex items-center content-center">
               <CheckBox
                  ref={ref}
                  onChange={handleTodoToggle}
                  checked={todo.completed}
                  setChecked={() => (todo.completed = !todo.completed)}
               ></CheckBox>
               <h1 className="text-foreground block text-wrap">{todo.text}</h1>
            </div>
            <button
               onClick={handleTodoDelete}
               className="hidden group-hover:block p-6"
            >
               <IconCross></IconCross>
            </button>
         </div>
      );
   }
);

export default TodoItem;
