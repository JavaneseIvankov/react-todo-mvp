import { create } from 'zustand';
import type { Todo } from '../types';

interface TodosState {
   todos: Todo[];
   count: number;
   addTodo: (text: string, completed: boolean) => void;
   deleteTodo: (id: number) => void;
   toggleTodo: (id: number, completed: boolean) => void;
   clearCompleted: () => void;
   changeTodos: (todos: Todo[], count?: number) => void;
}

const useTodoStore = create<TodosState>((set) => ({
   todos: [
      {
         id: 1,
         text: 'Learn React',
         completed: false,
      },
      {
         id: 2,
         text: 'Learn Vue',
         completed: false,
      },
      {
         id: 3,
         text: 'Learn Angular',
         completed: false,
      },
   ],
   count: 3,
   addTodo: (text: string, completed: boolean) =>
      set((state) => ({
         todos: [
            ...state.todos,
            {
               id: state.count + 1,
               text: text,
               completed: completed,
            },
         ],
         count: state.count + 1,
      })),
   deleteTodo: (id: number) =>
      set((state) => ({
         todos: state.todos.filter((todo) => todo.id !== id),
      })),
   toggleTodo: (id: number, completed: boolean) =>
      set((state) => ({
         todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: completed } : todo
         ),
      })),
   clearCompleted: () =>
      set((state) => ({
         todos: state.todos.map((todo) => ({
            ...todo,
            completed: false,
         })),
      })),
   changeTodos: (todos: Todo[], count?: number) =>
      set((state) => ({
         todos: todos,
         count: count ?? state.count,
      })),
}));

export default useTodoStore;
