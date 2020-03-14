import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Register from "./pages/register.tsx";
import Login from "./pages/login";
// import Dashboard from './pages/Dashboard'
// import New from './pages/New'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Login} />
        {/* <Route path ="/new" component={New}/> */}
      </Switch>
    </BrowserRouter>
  );
}
