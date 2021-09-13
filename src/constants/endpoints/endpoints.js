export const endpoints = {
    users: {
        signIn: 'users/sign-in',
        signUp: 'users/sign-up',
        signOut: 'users/sign-out',
        resetPassword: 'users/reset-password',
        updateUserProfile: 'users/regular-user',
        updateOwnerProfile: 'users/restaurant-owner',
        blockForRestaurant: 'users/block-for-restaurant',
        sendResetPasswordEmail: 'users/forgotten-password',
        unblockFromRestaurant: 'users/unblock-from-restaurant',
        addRestaurantToFavorites: 'users/add-favorite-restaurant',
        validateResetId: resetId => `users/validate-reset-id/${resetId}`,
        removeRestaurantFromFavorites: 'users/remove-favorite-restaurant'
    },
    crypto: {
        publicRSAKey: 'crypto/public-rsa-key'
    },
    meals: {
        addOwnerMeal: 'meals/owner/add-meal',
        deleteOwnerMeal: 'meals/owner/delete-meal',
        changeMealOrder: 'meals/owner/change-order',
        getOwnerMeals: ownerId => `meals/owner/${ownerId}`,
    },
    restaurants: {
        get: 'restaurants'
    },
    orders: {
        getOwnerOrders: ownerId => `orders/owner/${ownerId}`,
        getUserOrders: userId => `orders/user/${userId}`,
        editOrderStatus: 'orders/status',
        create: 'orders'
    }
}
