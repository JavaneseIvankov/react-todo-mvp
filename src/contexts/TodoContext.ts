import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { Todo } from '../types';
import type { TodoAction } from '../reducers/todoReducer.type';

export const TodosContext = createContext<Todo[]>([]);
export const TodosDispatchContext = createContext<Dispatch<TodoAction> | null>(
   null
);
