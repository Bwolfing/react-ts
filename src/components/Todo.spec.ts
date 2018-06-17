import * as TestRender from "react-test-renderer";

import { Todo } from "./Todo";

describe("Todo", () => {
    beforeEach(() => {
        let todoItem: TodoItem = {
            completed: false,
            id: 1,
            text: "Text"
        };
        let onTodoClick = (id: number) => {};

        let testRender = TestRender.create(
            new Todo({
                item: todoItem,
                onClick: onTodoClick
            })
        );
    });

    it("then onClick property is bound to the elements onClick property.", () => {

    });
});