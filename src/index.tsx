import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "@app/components/Hello";
import { Grid } from "@app/components/Grid";
import { PersonDetails } from "@app/components/PersonDetails";

interface AppState {
    person?: Person;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            person: undefined
        };
    }

    onPersonClicked(person: Person) {
        this.setState({
            person: person
        });
    }

    render() {
        let selectedPerson = <p>No one selected.</p>
        
        if (this.state.person) {
            selectedPerson = <PersonDetails person={this.state.person} />;
        }

        return (
            <div className="row">
                <div className="col-12">
                    <Hello compiler="Typescript" framework="React" />
                </div>
                <div className="col-4">
                    <Grid onRowClickEvent={this.onPersonClicked.bind(this)} />
                </div>
                <div className="col-8">
                    {selectedPerson}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("App")
);