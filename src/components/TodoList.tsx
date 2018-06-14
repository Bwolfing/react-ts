import * as React from "react";

import { Todo } from "@app/components/Todo";

export class TodoList extends React.Component<{ todos: TodoItem[], onTodoClick: (id: number) => void }> {
    render() {
        return this.props.todos.map(t =>
            <Todo key={t.id} item={t} onClick={this.props.onTodoClick} />
        );
    }
}