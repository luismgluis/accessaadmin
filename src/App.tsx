import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

// -- Pages
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import AlertTemplate from "./components/ui/AlertTemplate/AlertTemplate";
import { Provider as AlertProvider } from "react-alert";
import PrivateRoute from "./components/ui/PrivateRoute/PrivateRoute";

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <AlertProvider timeout={5000} template={AlertTemplate}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            {/* <Route path="/home">
              <Home />
            </Route> */}
            <Route path="/home">
              <PrivateRoute component={() => <Home />} />
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Router>
      </AlertProvider>
    </div>
  );
};

export default App;
