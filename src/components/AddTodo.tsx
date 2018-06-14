import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { addTodo } from "@app/state/actions/TodoListActions";

interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

function mapDispatchesToProps(dispatch: Dispatch) {
    return {
        onAddTodo: (text: string) => {
            dispatch(addTodo(text))
        }
    };
}

class AddTodoUi extends React.Component<AddTodoProps> {
    render() {
        let input: HTMLInputElement;

        function onFormSubmit(e: Event) {
            e.preventDefault();

            let todoText = input.value;

            if (!todoText) {
                return;
            }

            this.props.onAddTodo(todoText);
            input.value = "";
        }

        return (
            <form onSubmit={onFormSubmit.bind(this)}>
                <div className="form-group">
                    <label>Todo</label>
                    <input ref={node => input = node} className="form-control" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                        Add todo
                    </button>
                </div>
            </form>
        )
    }
}

export const AddTodo = connect(undefined, mapDispatchesToProps)(AddTodoUi);