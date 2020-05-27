import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RegisterTransaction from './pages/RegisterTransaction';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RegisterTransaction} />
        <Route path="/uploadFile" component={RegisterTransaction} />

      </Switch>
    </BrowserRouter>
  );
}