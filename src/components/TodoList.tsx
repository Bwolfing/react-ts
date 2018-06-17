import * as React from "react";

import { Todo } from "@app/components/Todo";

interface TodoListProps {
    todos: TodoItem[];
    fetchingTodos: boolean;
    onTodoClick: (id: number) => void;
}

export class TodoList extends React.Component<TodoListProps> {
    render() {
        if (this.props.fetchingTodos) {
            return (
                <div className="alert alert-info text-center">
                    Loading...
                </div>
            );
        }
        return this.props.todos.map(t =>
            <Todo key={t.id} item={t} onClick={this.props.onTodoClick} />
        );
    }
}