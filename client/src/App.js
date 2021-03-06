import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./template/Dashboard";

import AlertMsg from "./components/AlertMsg";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/auth.actions";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken.startsWith("Bearer ")) {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);
  return (
    <>
      {isAuthenticated === null ? (
        <p>Loading...</p>
      ) : (
        <Router>
          <AlertMsg />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
