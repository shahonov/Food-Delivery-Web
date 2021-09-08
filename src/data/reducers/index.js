/* istanbul ignore file */

import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { mealsReducer } from "./meals";
import { combineReducers } from "redux";
import { ordersReducer } from "./orders";
import { restaurantsReducer } from "./restaurants";
import { notificationReducer } from './notification';
import { applicationLoaderReducer } from './applicationLoader';

export const createRootReducer = () => combineReducers({
    user: userReducer,
    cart: cartReducer,
    meals: mealsReducer,
    orders: ordersReducer,
    restaurants: restaurantsReducer,
    notification: notificationReducer,
    applicationLoader: applicationLoaderReducer
});
