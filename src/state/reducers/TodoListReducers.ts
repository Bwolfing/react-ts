import { combineReducers } from "redux";

import { TodoListAction, ToggleTodoAction, AddTodoAction, TodoListVisibility, TodoFilterAction } from "@app/state/actions/TodoListActions";

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

export const todoApp = combineReducers({
    todos,
    filter
});