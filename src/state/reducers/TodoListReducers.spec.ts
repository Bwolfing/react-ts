import { fetchingTodos } from "./TodoListReducers";
import { PendingTodoFetchAction, TodoListAction, FulfilledTodoFetchAction, RejectedTodoFetchAction } from "../actions/TodoListActions";

describe("fetchingTodos", () => {
    it("when action type is 'Fetch Todos_PENDING' then result is truthy.", () => {
        const action: PendingTodoFetchAction = {
            type: "Fetch Todos_PENDING"
        };

        thenResultIsTruthy(action);
        thenResultIsTruthy(action);
    });

    it("when action type is 'Fetch Todos_FULFILLED' then result is falsy.", () => {
        const action: FulfilledTodoFetchAction = {
            type: "Fetch Todos_FULFILLED",
            payload: undefined
        };

        thenResultIsFalsy(action);
        thenResultIsFalsy(action);
    });

    it("when action type is 'Fetch Todos_REJECTED' then result is falsy.", () => {
        const action: RejectedTodoFetchAction = {
            type: "Fetch Todos_REJECTED",
            error: true,
            payload: undefined
        };

        thenResultIsFalsy(action);
        thenResultIsFalsy(action);
    });

    it("when action type isn't 'Fetch Todos_*' then result is falsy.", () => {
        thenResultIsFalsy({
            type: "Add Todo"
        });
        thenResultIsFalsy({
            type: "Fetch Todos"
        });
        thenResultIsFalsy({
            type: "Set Visibility"
        });
        thenResultIsFalsy({
            type: "Toggle Todo"
        });
    })

    function thenResultIsTruthy(action: TodoListAction) {
        expect(fetchingTodos(true, action)).toBeTruthy();
        expect(fetchingTodos(false, action)).toBeTruthy();
    }

    function thenResultIsFalsy(action: TodoListAction) {
        expect(fetchingTodos(true, action)).toBeFalsy();
        expect(fetchingTodos(false, action)).toBeFalsy();
    }
});