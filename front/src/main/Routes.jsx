import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import AuthOrHome from "../pages/AuthOrHome";
import HomeScreen from "../pages/HomeScreen";
import Login from "../pages/Login";
import CreateLogin from "../pages/CreateLogin";
import HomeUser from "../pages/HomeUser";
import Developing from "../pages/Developing";
import NotFound from "../pages/NotFound";
import AlterPassword from '../pages/AlterPassword';
import { createBrowserHistory } from "history";
import Logout from "../pages/Logout";
import Help from "../pages/Help";
import DetailsProvider from "../pages/DetailsProvider";
import Orders from "../pages/Orders";
import Awaiting_Payment from "../pages/OrderDetails";
import Favorites from "../pages/Favorites";
import Chat from "../pages/Chat";
import ClientProfile from "../pages/ClientProfile";
import CreateAccount from "../pages/CreateAccount";

const history = createBrowserHistory()

export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={AuthOrHome}></Route>
            <Route exact path="/homeScreen" component={HomeScreen}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/createLogin" component={CreateLogin}></Route>
            <Route exact path="/homeUser" component={HomeUser}></Route>
            <Route exact path="/developing" component={Developing}></Route>
            <Route exact path="/signout" component={Logout}></Route>
            <Route exact path="/help" component={Help}></Route>
            <Route exact path="/alterpassword" component={AlterPassword}></Route>
            <Route path="/detailsProvider/:id" component={DetailsProvider}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/details/:id" component={Awaiting_Payment}></Route>
            <Route path="/favorites" component={Favorites}></Route>
            <Route path="/chat" component={Chat}></Route>
            <Route path="/profile" component={ClientProfile}></Route>
            <Route path="/createAccount/:email" component={CreateAccount}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </Router>
)