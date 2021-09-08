/* istanbul ignore file */

import { showNotification } from "./notificationActions";
import { GET_RESTAURANTS_SUCCESS } from "data/actionTypes";
import { notificationTypes } from "constants/notificationTypes";
import { restaurantsService } from "services/restaurantsService";
import { hideApplicationLoader, showApplicationLoader } from "./applicationLoaderActions";

const getRestaurantsSuccess = payload => ({ type: GET_RESTAURANTS_SUCCESS, payload });
export const getRestaurants = (from, to) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await restaurantsService.get(from, to);
        dispatch(getRestaurantsSuccess(result));
    } catch (err) {
        dispatch(showNotification('could not get restaurants', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}
