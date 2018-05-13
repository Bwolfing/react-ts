import * as React from "react";

interface GridRowProperties {
    person: Person;
    onClickEvent: (person: Person) => void;
}

interface GridProperties {
    onRowClickEvent: (person: Person) => void;
}

interface GridState {
    data: Person[];
}

class GridRow extends React.Component<GridRowProperties, {}> {
    onClick() {
        this.props.onClickEvent(this.props.person);
    }

    render() {
        return (
            <tr data-id={this.props.person.id} onClick={this.onClick.bind(this)}>
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

export class Grid extends React.Component<GridProperties, GridState> {
    constructor(props: GridProperties) {
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
            <GridRow key={person.id} person={person} onClickEvent={this.props.onRowClickEvent} />
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