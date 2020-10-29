import React from 'react';
import Route from './Route';
import { BrowserRouter, Switch } from 'react-router-dom';

import { AuthProvider } from '../hooks/auth';

import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import DashboardPending from '../pages/DashboardPending';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import DeleteOrphanage from '../pages/DeleteOrphanage';
import Orphanage from '../pages/Orphanage';
import LogIn from '../pages/LogIn';
import CreateAccount from '../pages/CreateAccount';

function Routes() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={LogIn} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} isPrivate />
            <Route path="/orphanages/delete/:id" component={DeleteOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/dashboard/pending" exact component={DashboardPending} isPrivate />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routes;