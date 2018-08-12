import * as React from "react";

export interface TodoProps {
    item: TodoItem;
    onTodoClick: (id: number) => void;
}

export class Todo extends React.Component<TodoProps> {
    render() {
        return (
            <div className="card" onClick={() => this.props.onTodoClick(this.props.item.id)}>
                <div className="card-body">
                    <p className="card-text">
                        <input type="checkbox" checked={this.props.item.completed} disabled />
                        <span className={this.props.item.completed ? "text-line-through" : "" }>
                            {this.props.item.text}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}