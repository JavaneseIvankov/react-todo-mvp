import type { Todo } from "../types";

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

export interface TodosState {
   todos: Todo[],
   count: number,
}

export type TodoAction =
   | AddTodoAction
   | RemoveTodoAction
   | ToggleTodoAction
   | ClearCompletedAction;
