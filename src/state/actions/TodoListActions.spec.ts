import { addTodo, toggleTodo } from "./TodoListActions";

describe("addTodo", () => {
    it("should use the provided text.", () => {
        const expectedText = "The new todo item";

        const action = addTodo(expectedText);

        expect(action.type).toBe("Add Todo");
        expect(action.text).toBe(expectedText);
    });
});

describe("toggleTodo", () => {
    it("should use the provided id.", () => {
        const expectedId = 4;

        const action = toggleTodo(expectedId);

        expect(action.type).toBe("Toggle Todo");
        expect(action.id).toBe(expectedId);
    });
});