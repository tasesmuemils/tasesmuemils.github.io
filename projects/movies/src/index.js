import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MoviePage from "./components/MoviePage/MoviePage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/:movieId" component={MoviePage} />
        </Switch>
    </BrowserRouter>,
    document.querySelector("#root")
);
