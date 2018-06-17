import { fetch } from "cross-fetch";
import { Action, Dispatch } from "redux";

export type TodoListActionTypes = "Add Todo" | "Toggle Todo" | "Set Visibility" |
    "Fetch Todos" | "Received Todos" | "Failed Todos Fetch";

export const enum TodoListVisibility {
    All,
    Completed,
    Incomplete
}

export interface TodoListAction extends Action {
    type: TodoListActionTypes;
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

export interface FetchTodosAction extends TodoListAction {
    type: "Fetch Todos";
}

export interface RecievedTodosAction extends TodoListAction {
    type: "Received Todos";
    todos: TodoItem[];
}

export interface FailedTodosFetchAction extends TodoListAction {
    type: "Failed Todos Fetch";
    error: Error;
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

export function receivedTodos(todos: TodoItem[]): RecievedTodosAction {
    return {
        type: "Received Todos",
        todos
    };
}

export function failedTodosFetch(error: Error): FailedTodosFetchAction {
    return {
        type: "Failed Todos Fetch",
        error
    };
}

export function fetchTodos() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "Fetch Todos"
        });

        return fetch("/api/todos")
            .then(
                response => <Promise<TodoItem[]>>response.json()
            )
            .then(
                todos => dispatch(receivedTodos(todos)),
                error => dispatch(failedTodosFetch(error))
            );
    };
}