import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Todo from "./components/Todo";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>

        <Route path="/sign-up" exact>
          <SignUp />
        </Route>

        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>

        <Route path="/todo">
          <Todo />
        </Route>

        <Route path="*">
          <Redirect to="/sign-in" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
