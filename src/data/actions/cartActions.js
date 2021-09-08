import { showNotification } from "./notificationActions"
import { notificationTypes } from "constants/notificationTypes"
import {
    CLEAR_CART_SUCCESS,
    ADD_MEAL_TO_CART_SUCCESS,
    REMOVE_MEAL_FROM_CART_SUCCESS,
    CHANGE_CART_MEAL_QUANTITY_SUCCESS
} from "data/actionTypes";
import { hideApplicationLoader, showApplicationLoader } from "./applicationLoaderActions";

const addMealToCartSuccess = payload => ({ type: ADD_MEAL_TO_CART_SUCCESS, payload });
export const addMealToCart = mealInfo => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        dispatch(addMealToCartSuccess(mealInfo));
        dispatch(showNotification('successfully added meal to cart', notificationTypes.success));
    } catch (err) {
        dispatch(showNotification('could not add meal to cart', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const removeMealFromCartSuccess = payload => ({ type: REMOVE_MEAL_FROM_CART_SUCCESS, payload });
export const removeMealFromCart = mealId => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        dispatch(removeMealFromCartSuccess(mealId));
        dispatch(showNotification('successfully added meal to cart', notificationTypes.success));
    } catch (err) {
        dispatch(showNotification('could not add meal to cart', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const clearCartSuccess = () => ({ type: CLEAR_CART_SUCCESS });
export const clearCart = () => async dispatch => {
    try {
        dispatch(clearCartSuccess());
    } catch (err) {
        dispatch(showNotification('could not clear cart', notificationTypes.error));
    }
}

const changeCartMealQuantitySuccess = payload => ({ type: CHANGE_CART_MEAL_QUANTITY_SUCCESS, payload });
export const changeCartMealQuantity = (mealId, quantity) => async dispatch => {
    try {
        dispatch(changeCartMealQuantitySuccess({ mealId, quantity }));
    } catch (err) {
        dispatch(showNotification('could not add meal to cart', notificationTypes.error));
    }
}
