import * as React from "react";

import { ConnectedTodoList } from "@app/components/ConnectedTodoList";
import { RefreshTodos } from "@app/components/RefreshTodos";
import { AddTodo } from "@app/components/AddTodo";

export class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h5 className="display-4">
                        Welcome!
                    </h5>
                </div>
                <p>
                    This is a simple progressive web app that I built for trying to learn about
                    the following technologies!
                </p>
                <ul>
                    <li>
                        React
                    </li>
                    <li>
                        Redux
                    </li>
                    <li>
                        Service workers
                    </li>
                </ul>
                <div>
                    <RefreshTodos />
                    <ConnectedTodoList />
                    <AddTodo />
                </div>
            </div>
        );
    }
}