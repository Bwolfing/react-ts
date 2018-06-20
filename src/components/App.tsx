import "@app/styles/styles.scss";

import * as React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { applyMiddleware, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import { Provider } from "react-redux";

import { todoApp } from "@app/state/reducers/TodoListReducers";

import { Home } from "@app/components/Home";
import { About } from "@app/components/About";
import { fetchTodos } from "@app/state/actions/TodoListActions";
import { Routes } from "@app/application-routes";

const NavLinks = [
    {
        url: Routes.Index,
        exact: true,
        text: "Home",
        component: Home
    },
    {
        url: Routes.About,
        text: "About",
        component: About
    }
];


export class App extends React.Component {
    private todoAppStore: Store;

    constructor(props: any) {
        super(props);

        this.todoAppStore = createStore(
            todoApp,
            applyMiddleware(
                promiseMiddleware(),
                createLogger()
            )
        );
    }

    componentDidMount() {
        this.todoAppStore.dispatch(fetchTodos());
    }

    render() {
        const navLinks = NavLinks.map(l =>
            <li key={l.url} className="nav-item">
                <NavLink className="nav-link" exact={l.exact} to={l.url}>
                    {l.text}
                </NavLink>
            </li>
        );
        const navRoutes = NavLinks.map(l =>
            <Route key={l.url} exact={l.exact} path={l.url} component={l.component} />
        );

        return (
            <Provider store={this.todoAppStore}>
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
            </Provider>
        );
    }
}