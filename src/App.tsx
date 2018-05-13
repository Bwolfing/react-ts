import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home } from "@app/components/Home";
import { About } from "@app/components/About";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link> 
                        </li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("App")
);