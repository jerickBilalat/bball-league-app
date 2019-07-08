import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./layout";
import AuthHOC from "./components/AuthHOC";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GameRecordsPage from "./pages/GameRecordsPage";
import ManageGamePage from "./pages/ManageGamePage";
import HomePage from "./pages/HomePage";

const AuthManageGamePage = AuthHOC(ManageGamePage);

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/game_records" exact component={GameRecordsPage}/>
        <Route path="/manage_game" exact component={AuthManageGamePage} />
        <Route path="/manage_game/:id" exact component={ManageGamePage} />
      </Switch>
    </Layout>
  )
}

export default Routes;