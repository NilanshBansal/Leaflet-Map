import React from "react";
import {Router,Route,browserHistory} from "react-router";
import App from "../../ui/app";
// import Login from "../../ui/login";

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        {/* <Route path="/login" component={Login}/> */}
    </Router>
) 