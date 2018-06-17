import { combineReducers } from "redux";

import { TodoListAction, ToggleTodoAction, AddTodoAction, TodoListVisibility, TodoFilterAction, FulfilledTodoFetchAction } from "@app/state/actions/TodoListActions";

function todos(state: TodoItem[] = [], action: TodoListAction): TodoItem[] {
    switch (action.type) {
        case "Toggle Todo":
            let toggledTodo = <ToggleTodoAction>action;
            return state.map(t => {
                if (t.id !== toggledTodo.id) {
                    return t;
                }

                return Object.assign({}, t, {
                    completed: !t.completed
                })
            });
        case "Add Todo":
            let newTodo = <AddTodoAction>action;
            return [
                ...state,
                {
                    id: state.length + 1,
                    completed: false,
                    text: newTodo.text
                }
            ];
        case "Fetch Todos_FULFILLED":
            return (<FulfilledTodoFetchAction>action).payload;
        default:
            return state;
    }
}

function filter(state: TodoListVisibility = TodoListVisibility.All, action: TodoListAction): TodoListVisibility {
    switch (action.type) {
        case "Set Visibility":
            return (<TodoFilterAction>action).filter;
        default:
            return state;
    }
}

export function fetchingTodos(state: boolean, action: TodoListAction): boolean {
    switch (action.type) {
        case "Fetch Todos_PENDING":
            return true;
        case "Fetch Todos_FULFILLED":
        case "Fetch Todos_REJECTED":
        default:
            return false;
    }
}

export const todoApp = combineReducers({
    todos,
    filter,
    fetchingTodos
});