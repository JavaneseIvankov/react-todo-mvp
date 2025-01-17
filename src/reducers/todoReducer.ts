import type { Todo } from '../types';
import type { TodoAction } from './todoReducer.type';

export default function TodoReducer(todos: Todo[], action: TodoAction) {
   switch (action.type) {
      case 'ADD_TODO': {
         const lastElementId =
            todos.length > 0 ? (todos[todos.length - 1] as Todo).id : 1;
         return [
            ...todos,
            {
               id: lastElementId + 1,
               text: action.payload.text,
               completed: action.payload.completed,
            },
         ];
      }
      case 'DELETE_TODO': {
         return todos.filter((todo) => todo.id !== action.payload.id);
      }
      case 'TOGGLE_TODO': {
         return todos.map((todo) =>
            todo.id === action.payload.id
               ? { ...todo, completed: action.payload.completed }
               : todo
         );
      }
      case 'CLEAR_COMPLETED': {
         return todos.map((todo) => {
            return { ...todo, completed: false };
         });
      }
      default: {
         throw new Error(`Unhandled action type: ${action.type}`);
      }
   }
}
