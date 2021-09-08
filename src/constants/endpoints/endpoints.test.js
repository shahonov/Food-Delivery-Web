import { endpoints } from './endpoints';

describe('endpoints', () => {
    describe('users', () => {

        it('should contain sign in endpoint', () => {
            expect(endpoints.users.signIn).toEqual('users/sign-in');
        });

        it('should contain sign up endpoint', () => {
            expect(endpoints.users.signUp).toEqual('users/sign-up');
        });

        it('should contain update user profile endpoint', () => {
            expect(endpoints.users.updateUserProfile).toEqual('users/regular-user');
        });

        it('should contain update owner profile endpoint', () => {
            expect(endpoints.users.updateOwnerProfile).toEqual('users/restaurant-owner');
        });
    })

    describe('crypto', () => {
        it('should contain crypto public rsa key endpoint', () => {
            expect(endpoints.crypto.publicRSAKey).toEqual('crypto/public-rsa-key');
        });
    })

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
    })
});
