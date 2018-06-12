import { Action } from "redux";

export type TodoListActionTypes = "Add Todo" | "Toggle Todo" | "Set Visibility";

export const enum TodoListVisibility {
    All,
    Completed,
    Incomplete
}

interface TodoListAction extends Action {
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