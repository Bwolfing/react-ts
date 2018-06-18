import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import { Todo, TodoProps } from "./Todo";

describe("Todo", () => {
    let todoProps: TodoProps;
    let todoComponent: ShallowWrapper;

    beforeEach(() => {
        todoProps = {
            item: {
                id: 5,
                completed: false,
                text: "Todo item"
            },
            onTodoClick: (id: number) => {}
        };
    });

    it("when element clicked then onClick property is called with item id.", () => {
        let todoClickSpy = spyOn(todoProps, "onTodoClick");

        shallowRenderElement();

        todoComponent.find(".card").simulate("click");

        expect(todoClickSpy).toHaveBeenCalledTimes(1);
        expect(todoClickSpy).toHaveBeenCalledWith(todoProps.item.id);
    });

    it("when todo is completed then text-line-through class in use.", () => {
        todoProps.item.completed = true;

        shallowRenderElement();

        expect(todoComponent.find(".text-line-through").length).toBe(1);
    });

    it("when todo is not completed then text-line-through class is not in use.", () => {
        todoProps.item.completed = false;

        shallowRenderElement();

        expect(todoComponent.find(".text-line-through").length).toBe(0);
    });

    function shallowRenderElement() {
        todoComponent = shallow(<Todo item={todoProps.item} onTodoClick={todoProps.onTodoClick} />);
    }
});