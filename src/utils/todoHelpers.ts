import type { Todo, Filters } from '../types';

export default function getFilteredTodos(todoList: Todo[], filter: Filters) {
   const conditions = {
      all: () => true,
      active: (todo: Todo) => !todo.completed,
      completed: (todo: Todo) => todo.completed,
   };
   return todoList.filter(conditions[filter]);
}
