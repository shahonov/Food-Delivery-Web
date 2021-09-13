import { endpoints } from './endpoints';

describe('endpoints', () => {
    describe('users', () => {

        it('should contain sign in endpoint', () => {
            expect(endpoints.users.signIn).toEqual('users/sign-in');
        });

        it('should contain sign up endpoint', () => {
            expect(endpoints.users.signUp).toEqual('users/sign-up');
        });

        it('should contain sign out endpoint', () => {
            expect(endpoints.users.signOut).toEqual('users/sign-out');
        });

        it('should contain reset password endpoint', () => {
            expect(endpoints.users.resetPassword).toEqual('users/reset-password');
        });

        it('should contain update user profile endpoint', () => {
            expect(endpoints.users.updateUserProfile).toEqual('users/regular-user');
        });

        it('should contain update owner profile endpoint', () => {
            expect(endpoints.users.updateOwnerProfile).toEqual('users/restaurant-owner');
        });

        it('should contain block for restaurant endpoint', () => {
            expect(endpoints.users.blockForRestaurant).toEqual('users/block-for-restaurant');
        });

        it('should contain send reset password email endpoint', () => {
            expect(endpoints.users.sendResetPasswordEmail).toEqual('users/forgotten-password');
        });

        it('should contain unblock from restaurant endpoint', () => {
            expect(endpoints.users.unblockFromRestaurant).toEqual('users/unblock-from-restaurant');
        });

        it('should contain add restaurant to favorites endpoint', () => {
            expect(endpoints.users.addRestaurantToFavorites).toEqual('users/add-favorite-restaurant');
        });

        it('should contain endpoint', () => {
            expect(typeof endpoints.users.validateResetId).toEqual('function');
            expect(endpoints.users.validateResetId('123')).toEqual('users/validate-reset-id/123');
        });

        it('should contain remove restaurant from favorites endpoint', () => {
            expect(endpoints.users.removeRestaurantFromFavorites).toEqual('users/remove-favorite-restaurant');
        });
    });

    describe('crypto', () => {
        it('should contain crypto public rsa key endpoint', () => {
            expect(endpoints.crypto.publicRSAKey).toEqual('crypto/public-rsa-key');
        });
    });

    describe('meals', () => {
        it('should contain get endpoint', () => {
            expect(typeof endpoints.meals.getOwnerMeals).toEqual('function');
            expect(endpoints.meals.getOwnerMeals('pizza')).toEqual('meals/owner/pizza');
        });

        it('should contain add endpoint', () => {
            expect(endpoints.meals.addOwnerMeal).toEqual('meals/owner/add-meal');
        });

        it('should contain delete endpoint', () => {
            expect(endpoints.meals.deleteOwnerMeal).toEqual('meals/owner/delete-meal');
        });
    });

    describe('restaurants', () => {
        it('should contain get endpoint', () => {
            expect(endpoints.restaurants.get).toEqual('restaurants');
        });
    });

    describe('orders', () => {
        it('should contain get owner orders endpoint', () => {
            expect(typeof endpoints.orders.getOwnerOrders).toEqual('function');
            expect(endpoints.orders.getOwnerOrders(123)).toEqual('orders/owner/123');
        });

        it('should contain get user orders endpoint', () => {
            expect(typeof endpoints.orders.getUserOrders).toEqual('function');
            expect(endpoints.orders.getUserOrders(321)).toEqual('orders/user/321');
        });

        it('should contain edit order status endpoint', () => {
            expect(endpoints.orders.editOrderStatus).toEqual('orders/status');
        });

        it('should contain create order endpoint', () => {
            expect(endpoints.orders.create).toEqual('orders');
        });
    });
});
