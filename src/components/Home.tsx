import * as React from "react";
import { Todo } from "@app/components/Todo";

export class Home extends React.Component {
    private readonly _exampleTodos = [
        {
            id: 1,
            completed: true,
            text: "Read about React"
        },
        {
            id: 2,
            completed: true,
            text: "Read about Redux"
        },
        {
            id: 3,
            completed: false,
            text: "Build basic React app"
        },
        {
            id: 4,
            completed: false,
            text: "Use Redux with React app"
        }
    ];

    onClickHandler(id: number) {
        let clickedTodo = this._exampleTodos.filter(t => t.id === id);
        
        if (clickedTodo.length !== 1) {
            console.error(`Unknown todo Id provided: ${id}`);
            return;
        }

        console.log(clickedTodo[0].text);
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h5 className="display-4">
                        Welcome!
                    </h5>
                </div>
                <p>
                    Incentives &amp; Conference Management is a full service <strong>incentive travel</strong> company,
                    specializing in completely planned award programs. With nearly 35 combined years
                    experience in the travel awards industry we offer the most comprehensive <strong>WORLDWIDE</strong>
                    trip packages ever established with our focus constantly aimed at personal
                    attention, creative programs, and client satisfaction. At Incentives &amp; Conference
                    Management no two trips are ever alike, something you and your client will sincerely
                    appreciate.
                </p>
                <div>
                    {this._exampleTodos.map(t => <Todo key={t.id} item={t} onClick={this.onClickHandler.bind(this)} />)}
                </div>
            </div>
        );
    }
}