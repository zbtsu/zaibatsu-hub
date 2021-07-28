import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import MainContent from "../MainContent";

// interface Props {}

const Routes = {
  Wrapper: Router,
  Switch: () => {
    return (
      <MainContent>
        <Switch>
          <Route path="/" exact>
            <div>Hello</div>
          </Route>
          <Route path="/combos" exact>
            <div>Combos</div>
          </Route>
          <Route path="/hub" exact>
            <div>Hub</div>
          </Route>
          <Route path="/guides" exact>
            <div>Guides</div>
          </Route>
          <Route path="/settings" exact>
            <div>Settings</div>
          </Route>
        </Switch>
      </MainContent>
    );
  },
};

export default Routes;