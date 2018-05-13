import * as React from "react";

export interface HelloProperties {
    compiler: string;
    framework: string;
}

export class Hello extends React.Component<HelloProperties, {}> {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron">
                        <h1 className="display-4">
                            Hello from {this.props.compiler} and {this.props.framework}!
                        </h1>
                        <p className="lead">
                            This is a sample application using React
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
