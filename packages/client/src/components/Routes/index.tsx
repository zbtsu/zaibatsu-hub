import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import MainContent from "../common/MainContent";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import NewCombo from "./pages/new/NewCombo";
import EditCombo from "./pages/edit/EditCombo";
import ProtectedRoute from "../common/ProtectedRoute";

const Routes = {
  Wrapper: Router,
  Switch: () => {
    return (
      <MainContent>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/combos" exact>
            <div>Combos</div>
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <ProtectedRoute path="/new/combo" exact>
            <NewCombo />
          </ProtectedRoute>
          <ProtectedRoute path="/edit/combo" exact>
            <EditCombo />
          </ProtectedRoute>
        </Switch>
      </MainContent>
    );
  },
};

export default Routes;
