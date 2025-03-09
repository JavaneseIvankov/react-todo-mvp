import React, { forwardRef } from 'react';
import type { Todo } from '../types';
import CheckBox from './primitives/CheckBox';
import IconCross from '../assets/icons/icon-cross';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../lib/utils';
import clsx from 'clsx';
import useTodoStore from '../stores/todoStore';

interface TodoItemProps {
   todo: Todo;
   className?: string;
}

const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
   ({ todo, className }, ref) => {
      const {
         attributes,
         listeners,
         setNodeRef,
         transform,
         transition,
         isDragging,
      } = useSortable({ id: todo.id });

      const style = {
         transform: CSS.Transform.toString(transform),
         transition,
      };

      const toggleTodo = useTodoStore((s) => s.toggleTodo);
      const deleteTodo = useTodoStore((s) => s.deleteTodo);
      const handleTodoToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
         toggleTodo(todo.id, e.target.checked);
      };

      const handleTodoDelete = () => {
         deleteTodo(todo.id);
      };

      return (
         <div
            className={cn(
               clsx({
                  'group flex h-fit items-center content-center w-full bg-primary justify-between relative':
                     true,
                  'z-10 bg-primary transition-opacity brightness-110':
                     isDragging,
               }),
               className
            )}
            ref={setNodeRef}
            style={style}
         >
            <div
               key="drag-handle"
               className="opacity-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-9/12 h-full"
               {...attributes}
               {...listeners}
            />
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
               <IconCross />
            </button>
         </div>
      );
   }
);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
