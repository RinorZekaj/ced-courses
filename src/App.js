import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Courses from "./container/Courses/Courses";
import Archived from "./container/Archived/Archived";
import Earnings from "./container/Earnings/Earnings";
import Costs from "./container/Costs/Costs";
import Auth from "./container/Auth/Auth";
import LogOut from "./container/Auth/LogOut/LogOut";
import { authCheckState } from "./redux/actions/authActions";

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/" component={Courses} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/logout" component={LogOut} />
        <Route path="/archived" component={Archived} />
        <Route path="/earnings" component={Earnings} />
        <Route path="/costs" component={Costs} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={Courses} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
