import * as React from "react";

export class PersonDetails extends React.Component<{ person: Person }, {}> {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.person.name}
                    </h5>
                    <p className="card-text">
                        Individual's age is {this.props.person.age} years old.
                    </p>
                </div>
            </div>
        )
    }
}