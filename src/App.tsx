import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Home } from "@app/components/Home";
import { About } from "@app/components/About";
import { ContactUs } from "@app/components/ContactUs";

class App extends React.Component {
    private readonly _links = [
        {
            url: "/",
            exact: true,
            text: "Home",
            component: Home
        },
        {
            url: "/about",
            text: "About",
            component: About
        },
        {
            url: "/contact",
            text: "Contact Us",
            component: ContactUs
        }
    ];

    render() {
        const navLinks = this._links.map(l =>
            <li className="nav-item">
                <NavLink className="nav-link" exact={l.exact} to={l.url}>
                    {l.text}
                </NavLink> 
            </li>
        );
        const navRoutes = this._links.map(l =>
            <Route exact={l.exact} path={l.url} component={l.component} />
        );

        return (
            <Router>
                <div className="container-fluid">
                    <div className="navbar">
                        <ul className="nav nav-tabs">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="row">
                        {navRoutes}
                    </div>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("App")
);