import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import LogIn from '../pages/LogIn';
import CreateAccount from '../pages/CreateAccount';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/login" component={LogIn} />
          <Route exact path="/" component={Landing} />
          <Route path="/app" component={OrphanagesMap} />
          <Route path="/orphanages/create" component={CreateOrphanage} isPrivate />
          <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;