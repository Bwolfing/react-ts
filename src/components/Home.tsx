import * as React from "react";

import { ConnectedTodoList } from "@app/components/ConnectedTodoList";
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
                    Incentives &amp; Conference Management is a full service <strong>incentive travel</strong> company,
                    specializing in completely planned award programs. With nearly 35 combined years
                    experience in the travel awards industry we offer the most comprehensive <strong>WORLDWIDE</strong>
                    trip packages ever established with our focus constantly aimed at personal
                    attention, creative programs, and client satisfaction. At Incentives &amp; Conference
                    Management no two trips are ever alike, something you and your client will sincerely
                    appreciate.
                </p>
                <div>
                    <ConnectedTodoList />
                    <AddTodo />
                </div>
            </div>
        );
    }
}