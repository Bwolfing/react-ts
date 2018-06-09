import "@app/styles/custom.scss";

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
            <li key={l.url} className="nav-item">
                <NavLink className="nav-link" exact={l.exact} to={l.url}>
                    {l.text}
                </NavLink> 
            </li>
        );
        const navRoutes = this._links.map(l =>
            <Route key={l.url} exact={l.exact} path={l.url} component={l.component} />
        );

        return (
            <Router>
                <div className="container-fluid">
                    <div className="navbar">
                        <ul className="nav nav-tabs">
                            {navLinks}
                        </ul>
                    </div>
                    {navRoutes}
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("App")
);