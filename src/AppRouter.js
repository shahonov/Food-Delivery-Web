/* istanbul ignore file */

import { Switch, Route } from 'react-router-dom';

import { roles } from 'global/roles';

import Home from 'pages/Home';
import Cart from 'pages/Cart';
import Orders from 'pages/Orders';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import Restaurants from 'pages/Restaurants';
import ResetPassword from 'pages/ResetPassword';
import RestaurantFoods from 'pages/RestaurantFoods';
import ForgottenPassword from 'pages/ForgottenPassword';

import { withAuthorization } from 'hocs/withAuthorization';
import { withAuthentication } from 'hocs/withAuthentication';

const ProfilePage = withAuthentication(Profile);
const CartPage = withAuthorization(Cart, [roles.regularUser]);
const RestaurantFoodsPage = withAuthentication(RestaurantFoods);
const OrdersPage = withAuthorization(Orders, [roles.restaurantOwner]);

const AppRouter = () => {
    return (
        <div style={{ marginTop: '10vh' }}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/cart' component={CartPage} />
                <Route path='/sign-in' component={SignIn} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/orders' component={OrdersPage} />
                <Route path='/profile' component={ProfilePage} />
                <Route path='/restaurants' component={Restaurants} />
                <Route path='/forgotten-password' component={ForgottenPassword} />
                <Route path='/reset-password/:resetId' component={ResetPassword} />
                <Route path='/foods/:restaurantName/:restaurantId' component={RestaurantFoodsPage} />
            </Switch>
        </div>
    );
}

export default AppRouter;
