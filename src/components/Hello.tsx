import * as React from "react";

export interface HelloProperties {
    compiler: string;
    framework: string;
}

export class Hello extends React.Component<HelloProperties, {}> {
    render() {
        return (
            <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        );
    }
}
