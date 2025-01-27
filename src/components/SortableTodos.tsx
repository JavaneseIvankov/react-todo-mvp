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

import { restrictToParentElement } from '@dnd-kit/modifiers';

import TodoItem from './TodoItem';
import type React from 'react';
import { Fragment } from 'react';

interface SortableTodosProps {
   todos: Todo[];
   changeTodos: (todos: Todo[]) => void;
}

export default function SortableTodos({
   todos,
   changeTodos,
}: SortableTodosProps) {
   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      })
   );

   function reorderTodos(
      todos: Todo[],
      active: SortableData,
      over: SortableData
   ) {
      const oldIndex = active.sortable.index;
      const newIndex = over.sortable.index;

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      changeTodos(newTodos);
   }

   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      if (active.id !== over?.id) {
         reorderTodos(
            todos,
            active.data.current as SortableData,
            over?.data.current as SortableData
         );
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
            <SortableContext
               items={todos}
               strategy={verticalListSortingStrategy}
            >
               {todos.map((todo) => (
                  <Fragment key={todo.id}>
                     <TodoItem
                        todo={todo}
                        className="border-b-2 border-b-muted-foreground"
                     />
                     {/* <Separator
                     orientation="horizontal"
                     className="h-[1px] bg-muted-foreground z-20"
                  /> */}
                  </Fragment>
               ))}
            </SortableContext>
         </DndContext>
      </div>
   );
}
