/* istanbul ignore file */

import NodeRSA from "node-rsa";

import { usersService } from "services/usersService"
import { cryptoService } from "services/cryptoService";
import { showNotification } from "./notificationActions";
import { notificationTypes } from "constants/notificationTypes";
import { hideApplicationLoader, showApplicationLoader } from "./applicationLoaderActions";
import {
    REMOVE_FAVORITE_RESTAURANT,
    ADD_FAVORITE_RESTAURANT,
    SIGN_OUT_SUCCESS,
    SIGN_IN_SUCCESS,
    UPDATE_PROFILE,
    UNBLOCK_USER,
    BLOCK_USER,
} from "data/actionTypes";

export const signOut = (userId, expiredSession) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.signOut(userId);
        if (result.isSuccess) {
            dispatch({ type: SIGN_OUT_SUCCESS });
            if (expiredSession) {
                dispatch(showNotification('session has expired', notificationTypes.warning));
            } else {
                dispatch(showNotification('successfully signed out', notificationTypes.success));
            }
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not sign out', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const signInSuccess = payload => ({ type: SIGN_IN_SUCCESS, payload });
export const signIn = (email, password) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const { publicRSAKey, encryptionId } = await cryptoService.getEncryptionInfo();
        const rsa = new NodeRSA(publicRSAKey);
        const encryptedPassword = rsa.encrypt(password, 'base64');
        const result = await usersService.signIn(email, encryptedPassword, encryptionId);
        if (result.isSuccess) {
            dispatch(signInSuccess(result.user));
            dispatch(showNotification('successfully signed in', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not sign in', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

export const signUp = (email, password, role) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const { publicRSAKey, encryptionId } = await cryptoService.getEncryptionInfo();
        const rsa = new NodeRSA(publicRSAKey);
        const encryptedPassword = rsa.encrypt(password, 'base64');
        const result = await usersService.signUp(email, encryptedPassword, encryptionId, role);
        if (result.isSuccess) {
            dispatch(showNotification('we have sent you an account activation email', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not sign up', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const updateProfileSuccess = payload => ({ type: UPDATE_PROFILE, payload });
export const updateRegularUserProfile = userInfo => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.updateRegularUserProfile(userInfo);
        if (result.isSuccess) {
            dispatch(updateProfileSuccess(userInfo));
            dispatch(showNotification('successfully updated profile info', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not update profile info', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

export const updateRestaurantOwnerProfile = userInfo => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.updateRestaurantOwnerProfile(userInfo);
        if (result.isSuccess) {
            dispatch(updateProfileSuccess(userInfo));
            dispatch(showNotification('successfully updated profile info', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not update profile info', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const addFavoriteRestaurantSuccess = payload => ({ type: ADD_FAVORITE_RESTAURANT, payload });
export const addRestaurantToFavorites = (userId, restaurantInfo) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.addRestaurantToFavorites(userId, restaurantInfo);
        if (result.isSuccess) {
            dispatch(addFavoriteRestaurantSuccess(restaurantInfo));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not add restaurant to favorites', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const removeFavoriteRestaurantSuccess = payload => ({ type: REMOVE_FAVORITE_RESTAURANT, payload });
export const removeRestaurantFromFavorites = (userId, restaurantId) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.removeRestaurantFromFavorites(userId, restaurantId);
        if (result.isSuccess) {
            dispatch(removeFavoriteRestaurantSuccess(restaurantId));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not remove restaurant from favorites', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

export const sendResetPasswordEmail = email => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.sendResetPasswordEmail(email);
        if (result.isSuccess) {
            dispatch(showNotification('successfully sent reset password email', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
        return result.isSuccess;
    } catch (err) {
        dispatch(showNotification('could not send reset password email', notificationTypes.error));
        return false;
    } finally {
        dispatch(hideApplicationLoader());
    }
}

export const resetPassword = (resetId, newPassword) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.resetPassword(resetId, newPassword);
        if (result.isSuccess) {
            dispatch(showNotification('successfully reset password', notificationTypes.success));
        } else {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
        return result.isSuccess;
    } catch (err) {
        dispatch(showNotification('could not reset password', notificationTypes.error));
        return false;
    } finally {
        dispatch(hideApplicationLoader());
    }
}

export const validateResetId = resetId => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.validateResetId(resetId);
        if (!result.isSuccess) {
            dispatch(showNotification(result.message, notificationTypes.error));
        }
        return result.isSuccess;
    } catch (err) {
        dispatch(showNotification('could not validate reset password request', notificationTypes.error));
        return false;
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const blockUserSuccess = payload => ({ type: BLOCK_USER, payload });
export const blockForRestaurant = (restaurantId, userId) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.blockForRestaurant(restaurantId, userId);
        if (result.isSuccess) {
            dispatch(blockUserSuccess({ userId }));
            dispatch(showNotification('successfully blocked user', notificationTypes.success));
        } else {
            dispatch(showNotification('could not block user', notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not block user', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}

const unblockUserSuccess = payload => ({ type: UNBLOCK_USER, payload });
export const unblockFromRestaurant = (restaurantId, userId) => async dispatch => {
    try {
        dispatch(showApplicationLoader());
        const result = await usersService.unblockFromRestaurant(restaurantId, userId);
        if (result.isSuccess) {
            dispatch(unblockUserSuccess({ userId }));
            dispatch(showNotification('successfully unblocked user', notificationTypes.success));
        } else {
            dispatch(showNotification('could not unblock user', notificationTypes.error));
        }
    } catch (err) {
        dispatch(showNotification('could not unblock user', notificationTypes.error));
    } finally {
        dispatch(hideApplicationLoader());
    }
}
