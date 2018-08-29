import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App  from './containers/App';
import HomePage from './containers/HomePage'
import CartPage from './containers/CartPage';

const routes = () =>(
    <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/home"/>
        )}/>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/cart' component={CartPage} />
    </Switch>
)

export default routes;