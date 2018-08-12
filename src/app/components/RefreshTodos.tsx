import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { fetchTodos } from "@app/state/actions/TodoListActions";

interface RefreshTodosProps {
    fetchingTodos: boolean;
    onClick: () => void;
}

class RefreshTodoUi extends React.Component<RefreshTodosProps> {
    render() {
        return (
            <button className="btn btn-primary" disabled={this.props.fetchingTodos} onClick={this.props.onClick}>
                Refresh Todos
            </button>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        fetchingTodos: state.fetchingTodos
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onClick: () => { dispatch(fetchTodos()) }
    };
}

export const RefreshTodos = connect(mapStateToProps, mapDispatchToProps)(RefreshTodoUi);