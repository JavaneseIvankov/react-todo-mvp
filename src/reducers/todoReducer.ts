import type { TodoAction, TodosState } from './todoReducer.type';

export default function TodoReducer(state: TodosState, action: TodoAction) {
   const { todos, count } = state;

   switch (action.type) {
      case 'ADD_TODO': {
         return {
            ...state,
            todos: [
               ...todos,
               {
                  id: count + 1,
                  text: action.payload.text,
                  completed: action.payload.completed,
               },
            ],
            count: count + 1,
         };
      }
      case 'DELETE_TODO': {
         return {
            ...state,
            todos: todos.filter((todo) => todo.id !== action.payload.id),
         };
      }
      case 'TOGGLE_TODO': {
         return {
            ...state,
            todos: todos.map((todo) =>
               todo.id === action.payload.id
                  ? { ...todo, completed: action.payload.completed }
                  : todo
            ),
         };
      }
      case 'CLEAR_COMPLETED': {
         return {
            ...state,
            todos: todos.map((todo) => {
               return { ...todo, completed: false };
            }),
         };
      }
      case 'CHANGE_TODOS': {
         return {
            ...state,
            todos: action.payload.todos,
            count: action.payload.count ?? state.count
         }
      }
      default: {
         throw new Error(`Unhandled action type: ${action.type}`);
      }
   }
}
