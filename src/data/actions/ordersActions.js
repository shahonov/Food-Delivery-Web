/* istanbul ignore file */

import { ordersService } from "services/ordersService";
import { showNotification } from "./notificationActions";
import { notificationTypes } from "constants/notificationTypes"
import {
    EDIT_ORDER_STATUS_SUCCESS,
    GET_OWNER_ORDERS_SUCCESS,
    GET_USER_ORDERS_SUCCESS,
    CREATE_ORDER_SUCCESS,
} from "data/actionTypes";
import { hideApplicationLoader, showApplicationLoader } from "./applicationLoaderActions";

const createOrderSuccess = payload => ({ type: CREATE_ORDER_SUCCESS, payload });
export const createOrder = orderInfo => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await ordersService.createOrder(orderInfo);
        if (result.isSuccess) {
            dispatch(createOrderSuccess(orderInfo));
            dispatch(showNotification('successfully created order', notificationTypes.error));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
        return result.isSuccess;
    } catch (err) {
        dispatch(showNotification('could not create order', notificationTypes.error));
        return false;
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const getOwnerOrdersSuccess = payload => ({ type: GET_OWNER_ORDERS_SUCCESS, payload });
export const getRestaurantOwnerOrders = ownerId => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await ordersService.getOwnerOrders(ownerId);
        dispatch(getOwnerOrdersSuccess(result));
    } catch (err) {
        dispatch(showNotification('could not get owner orders', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const getUserOrdersSuccess = payload => ({ type: GET_USER_ORDERS_SUCCESS, payload });
export const getRegularUserOrders = userId => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await ordersService.getUserOrders(userId);
        dispatch(getUserOrdersSuccess(result));
    } catch (err) {
        dispatch(showNotification('could not get user orders', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const editOrderStatusSuccess = payload => ({ type: EDIT_ORDER_STATUS_SUCCESS, payload });
export const editOrderStatus = (orderId, status) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const updateTime = Date.now();
        const statusChangelogObj = { when: updateTime, toStatus: status };
        const result = await ordersService.editOrderStatus(orderId, status, updateTime);
        if (result.isSuccess) {
            dispatch(editOrderStatusSuccess({ _id: orderId, status, statusChangelogObj }));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not update order status', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}
