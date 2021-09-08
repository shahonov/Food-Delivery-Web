/* istanbul ignore file */

import { mealsService } from "services/mealsService";
import { showNotification } from "./notificationActions";
import { notificationTypes } from "constants/notificationTypes";
import {
    ADD_OWNER_MEAL,
    GET_OWNER_MEALS,
    DELETE_OWNER_MEAL
} from "data/actionTypes";
import { hideApplicationLoader, showApplicationLoader } from "./applicationLoaderActions";

const getMealsSuccess = payload => ({ type: GET_OWNER_MEALS, payload });
export const getRestaurantOwnerMeals = (ownerId, from, to) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await mealsService.getOwnerMeals(ownerId, from, to);
        dispatch(getMealsSuccess(result));
    } catch (err) {
        dispatch(showNotification('could not get owner meals', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const addMealSuccess = payload => ({ type: ADD_OWNER_MEAL, payload });
export const addRestaurantOwnerMeal = (ownerId, meal) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await mealsService.addOwnerMeal(ownerId, meal);
        if (result.isSuccess) {
            const addedMeal = { _id: result._id, ownerId, ...meal };
            dispatch(addMealSuccess(addedMeal));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not add owner meal', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const deleteMealSuccess = payload => ({ type: DELETE_OWNER_MEAL, payload });
export const deleteRestaurantOwnerMeal = (ownerId, mealId) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await mealsService.deleteOwnerMeal(ownerId, mealId);
        if (result.isSuccess) {
            dispatch(deleteMealSuccess(mealId));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not delete owner meal', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}
