import { Action, Dispatch } from "redux";

export type FetchTodosActionTypes = "Fetch Todos_PENDING" | "Fetch Todos_FULFILLED" | "Fetch Todos_REJECTED";
export type TodoListActionTypes = "Add Todo" | "Toggle Todo" | "Set Visibility" | "Fetch Todos";

export const enum TodoListVisibility {
    All,
    Completed,
    Incomplete
}

export interface TodoListAction extends Action {
    type: TodoListActionTypes | FetchTodosActionTypes;
}

export interface AddTodoAction extends TodoListAction {
    type: "Add Todo";
    text: string;
}

export interface ToggleTodoAction extends TodoListAction {
    type: "Toggle Todo";
    id: number;
}

export interface TodoFilterAction extends TodoListAction {
    type: "Set Visibility";
    filter: TodoListVisibility;
}

interface InitiateFetchTodosAction extends TodoListAction {
    type: "Fetch Todos";
    payload: Promise<TodoItem[]>;
}

export interface PendingTodoFetchAction extends TodoListAction {
    type: "Fetch Todos_PENDING";
}

export interface FulfilledTodoFetchAction extends TodoListAction {
    type: "Fetch Todos_FULFILLED";
    payload: TodoItem[];
}

export interface RejectedTodoFetchAction extends TodoListAction {
    type: "Fetch Todos_REJECTED";
    error: boolean;
    payload: any;
}

export function addTodo(text: string): AddTodoAction {
    return {
        text,
        type: "Add Todo"
    };
}

export function toggleTodo(id: number): ToggleTodoAction {
    return {
        id,
        type: "Toggle Todo"
    };
}

export function setFilter(filter: TodoListVisibility): TodoFilterAction {
    return {
        filter,
        type: "Set Visibility"
    };
}

export function fetchTodos(): InitiateFetchTodosAction {
    return {
        type: "Fetch Todos",
        payload: window.fetch("/api/todos")
            .then(async response => {
                if (response.ok) {
                    return await response.json();
                }

                return Promise.reject(await response.json());
            })
    };
}