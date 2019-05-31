import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./layout";

import LoginPage from "./pages/LoginPage";
import GameRecordsPage from "./pages/GameRecordsPage";
import ManageGamePage from "./pages/ManageGamePage";
import HomePage from "./pages/HomePage";

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/game_records" exact component={GameRecordsPage}/>
        <Route path="/manage_game" exact component={ManageGamePage} />
        <Route path="/manage_game/:id" exact component={ManageGamePage} />
      </Switch>
    </Layout>
  )
}

export default Routes;