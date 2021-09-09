import { userReducer } from './userReducer';
import {
    REMOVE_FAVORITE_RESTAURANT,
    ADD_FAVORITE_RESTAURANT,
    SIGN_OUT_SUCCESS,
    SIGN_IN_SUCCESS,
    UPDATE_PROFILE,
    UNBLOCK_USER,
    BLOCK_USER,
} from 'data/actionTypes';

let initialState = {};
beforeEach(() => {
    initialState = {
        expiration: 0,
        favoriteRestaurants: [],
        blockedUsers: []
    }
});

describe('userReducer', () => {
    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = userReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return actions payload when sign in success action type', () => {
        const action = { type: SIGN_IN_SUCCESS, payload: { prop2: 'complete2' } };
        const result = userReducer(initialState, action);
        expect(result.prop2).toEqual('complete2');
    });

    it('should return initial state when sign out success action type', () => {
        const action = { type: SIGN_OUT_SUCCESS };
        const result = userReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return updated user object when update profile action type', () => {
        const payload = { address: 'some-address' };
        const action = { type: UPDATE_PROFILE, payload };
        const result = userReducer(initialState, action);
        expect(result).toEqual({ ...initialState, ...payload });
    });

    it('should return updated user object when add favorite restaurant action type', () => {
        const payload = { _id: 1, name: 'test' };
        const action = { type: ADD_FAVORITE_RESTAURANT, payload };
        const expected = { ...initialState, favoriteRestaurants: [...initialState.favoriteRestaurants, payload] };
        const result = userReducer(initialState, action);
        expect(result).toEqual(expected);
    });

    it('should return updated user object when remove favorite restaurant action type', () => {
        initialState = {
            favoriteRestaurants: [
                {
                    _id: 123,
                    name: 'check'
                },
                {
                    _id: 321,
                    name: 'checko'
                }
            ]
        }
        const payload = 123;
        const action = { type: REMOVE_FAVORITE_RESTAURANT, payload };
        const expected = {
            favoriteRestaurants: [{
                _id: 321,
                name: 'checko'
            }]
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual(expected);
    });

    it('should return updated user object when block user action type', () => {
        const payload = { userId: 'test123' };
        const action = { type: BLOCK_USER, payload };
        const expected = { ...initialState, blockedUsers: [...initialState.blockedUsers, payload.userId] };
        const result = userReducer(initialState, action);
        expect(result).toEqual(expected);
    });

    it('should return updated user object when unblock user action type', () => {
        initialState = {
            blockedUsers: [
                '123123',
                '456456',
                '789789'
            ]
        }
        const payload = { userId: '456456' };
        const action = { type: UNBLOCK_USER, payload };
        const expected = { ...initialState, blockedUsers: ['123123', '789789'] };
        const result = userReducer(initialState, action);
        expect(result).toEqual(expected);
    });
});