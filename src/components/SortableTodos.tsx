import type { Todo } from '../types';
import {
   DndContext,
   closestCenter,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   type DragEndEvent,
} from '@dnd-kit/core';

import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
   type SortableData,
} from '@dnd-kit/sortable';

import {
   restrictToParentElement
}
from '@dnd-kit/modifiers'



import TodoItem from './TodoItem';
import type React from 'react';
import type { TodoAction } from '../reducers/todoReducer.type';
import { Fragment } from 'react';

interface SortableTodosProps {
   todos: Todo[];
   dispatch: React.Dispatch<TodoAction>;
}

export default function SortableTodos({ todos, dispatch }: SortableTodosProps) {
   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      })
   );

   function reorderTodos(todos: Todo[], active: SortableData, over: SortableData) {
      const oldIndex = active.sortable.index; 
      const newIndex = over.sortable.index; 

      // console.log(oldIndex, newIndex)
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      // console.log(newTodos)
      dispatch({ type: 'CHANGE_TODOS', payload: { todos: newTodos } });
   }

   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      if (active.id !== over?.id) {
         console.log(active.data.current)
         reorderTodos(todos, active.data.current as SortableData, over?.data.current as SortableData);
      }
   }

   return (
   <div>
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
         modifiers={[restrictToParentElement]}
      >
         <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
               <Fragment key={todo.id}>
                  <TodoItem todo={todo} className='border-b-2 border-b-muted-foreground'/>
                  {/* <Separator
                     orientation="horizontal"
                     className="h-[1px] bg-muted-foreground z-20"
                  /> */}
               </Fragment>
            ))}
         </SortableContext>
      </DndContext>
   </div>
   )
}
