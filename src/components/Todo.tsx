import * as React from "react";

interface TodoProps {
    item: TodoItem;
    onClick: (id: number) => void;
}

export class Todo extends React.Component<TodoProps> {
    onClickHandler(e: Event) {
        e.preventDefault();
        this.props.onClick(this.props.item.id);
    }

    render() {
        return <div className="card" onClick={this.onClickHandler.bind(this)}>
            <div className="card-body">
                <p className="card-text">
                    <input type="checkbox" checked={this.props.item.completed} disabled />
                    <span className={this.props.item.completed ? "text-line-through" : "" }>
                        {this.props.item.text}
                    </span>
                </p>
            </div>
        </div>
    }
}