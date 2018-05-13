import * as React from "react";

interface Person {
    name: string;
    age: number;
    id: number;
}

interface GridState {
    data: Person[];
}

class GridRow extends React.Component<{person: Person}, {}> {
    render() {
        return (
            <tr data-id={this.props.person.id}>
                <td>
                    {this.props.person.name}
                </td>
                <td>
                    {this.props.person.age} years old
                </td>
            </tr>
        );
    }
}

export class Grid extends React.Component<{}, GridState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            data: [
                {
                    id: 1,
                    name: "Steve McGarret",
                    age: 30
                },
                {
                    id: 2,
                    name: "Tony Stark",
                    age: 42
                },
                {
                    id: 3,
                    name: "Steve Rogers",
                    age: 92
                },
            ]
        };
    }

    render() {
        const gridRows = this.state.data.map(person => 
            <GridRow key={person.id} person={person} />
        );

        return (
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {gridRows}
                </tbody>
            </table>
        );
    }
}