/* istanbul ignore file */

import { endpoints } from "constants/endpoints";
import { httpService } from "./httpService";

export const usersService = {
    /**
     * 
     * @param {string} email 
     * @param {string} encryptedPassword 
     * @param {string} encryptionId 
     * @returns UserObject
     */
    signIn: (email, encryptedPassword, encryptionId) => {
        return httpService.put(endpoints.users.signIn, { email, encryptedPassword, encryptionId })
    },
    /**
     * 
     * @param {string} email 
     * @param {string} encryptedPassword 
     * @param {string} encryptionId 
     * @returns isSuccess
     */
    signUp: (email, encryptedPassword, encryptionId, role) => {
        return httpService.post(endpoints.users.signUp, { email, encryptedPassword, encryptionId, role })
    },
    /**
     * 
     * @param {string} userId
     * @returns isSuccess
     */
    signOut: userId => httpService.patch(endpoints.users.signOut, { userId }),
    /**
     * 
     * @param {object} userInfo
     * @returns isSuccess
     */
    updateRegularUserProfile: userInfo => httpService.patch(endpoints.users.updateUserProfile, { userInfo }),
    /**
     * 
     * @param {object} userInfo
     * @returns isSuccess
     */
    updateRestaurantOwnerProfile: userInfo => httpService.patch(endpoints.users.updateOwnerProfile, { userInfo }),
    /**
     * 
     * @param {string} userId
     * @param {object} restaurantInfo
     * @returns isSuccess
     */
    addRestaurantToFavorites: (userId, restaurantInfo) => {
        return httpService.patch(endpoints.users.addRestaurantToFavorites, { userId, restaurantInfo });
    },
    /**
     * 
     * @param {string} userId
     * @param {string} restaurantId
     * @returns isSuccess
     */
    removeRestaurantFromFavorites: (userId, restaurantId) => {
        return httpService.delete(endpoints.users.removeRestaurantFromFavorites, { userId, restaurantId });
    },
    /**
     * 
     * @param {string} email
     * @returns isSuccess
     */
    sendResetPasswordEmail: email => httpService.put(endpoints.users.sendResetPasswordEmail, { email }),
    /**
     * 
     * @param {string} resetId
     * @param {string} newPassword
     * @returns isSuccess
     */
    resetPassword: (resetId, newPassword) => httpService.patch(endpoints.users.resetPassword, { resetId, newPassword }),
    /**
     * 
     * @param {string} resetId
     * @returns isSuccess
     */
    validateResetId: resetId => httpService.get(endpoints.users.validateResetId(resetId)),
    /**
     * 
     * @param {string} restaurantId
     * @param {string} userId
     * @returns isSuccess
     */
    blockForRestaurant: (restaurantId, userId) => {
        return httpService.patch(endpoints.users.blockForRestaurant, { restaurantId, userId })
    },
    /**
     * 
     * @param {string} restaurantId
     * @param {string} userId
     * @returns isSuccess
     */
    unblockFromRestaurant: (restaurantId, userId) => {
        return httpService.patch(endpoints.users.unblockFromRestaurant, { restaurantId, userId })
    }
}
