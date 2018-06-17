import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import { Provider } from "react-redux";

import { todoApp } from "@app/state/reducers/TodoListReducers";

import { Home } from "@app/components/Home";
import { About } from "@app/components/About";
import { addTodo, fetchTodos } from "@app/state/actions/TodoListActions";

const NavLinks = [
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
    }
];

const todoAppStore = createStore(
    todoApp,
    applyMiddleware(
        promiseMiddleware(),
        createLogger()
    )
);

todoAppStore.dispatch(fetchTodos());
// todoAppStore.dispatch(addTodo("Read about React"));
// todoAppStore.dispatch(addTodo("Build with React"));
// todoAppStore.dispatch(addTodo("Read Redux"));
// todoAppStore.dispatch(addTodo("Build with Redux"));

class App extends React.Component {
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
    <Provider store={todoAppStore}>
        <App />
    </Provider>,
    document.getElementById("App")
);