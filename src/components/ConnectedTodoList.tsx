import { Dispatch } from "redux";
import { connect } from "react-redux";

import { TodoList } from "@app/components/TodoList";
import { toggleTodo, TodoListVisibility } from "@app/state/actions/TodoListActions";

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        }
    };
}

function mapStateToProps(state: { todos: TodoItem[], filter: TodoListVisibility }) {
    return {
        todos: state.todos
    };
}

export const ConnectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);