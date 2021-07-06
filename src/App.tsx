import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Routes } from './constants';
import { Login, Posts } from './screens';

const App: FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.basePath} exact component={Login} />
        <Route path={Routes.postPath} exact component={Posts} />
        <Route path={Routes.basePath} render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
