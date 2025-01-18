import type { Todo } from '../types';

export interface AddTodoAction {
   type: 'ADD_TODO';
   payload: { text: string; completed: boolean };
}

export interface RemoveTodoAction {
   type: 'DELETE_TODO';
   payload: { id: number };
}

export interface ToggleTodoAction {
   type: 'TOGGLE_TODO';
   payload: { id: number; completed: boolean };
}

export interface ClearCompletedAction {
   type: 'CLEAR_COMPLETED';
}

export interface ChangeTodos {
   type: 'CHANGE_TODOS';
   payload: {todos: Todo[], count?: number};
}

export interface TodosState {
   todos: Todo[];
   count: number;
}

export type TodoAction =
   | AddTodoAction
   | RemoveTodoAction
   | ToggleTodoAction
   | ClearCompletedAction
   | ChangeTodos;
