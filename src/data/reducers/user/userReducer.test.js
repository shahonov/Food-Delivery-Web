import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, UPDATE_PROFILE } from 'data/actionTypes';
import { userReducer } from './userReducer';

let initialState = {};
beforeEach(() => {
    initialState = {
        expiration: 0
    }
});

describe('userReducer', () => {
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

    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = userReducer(initialState, action);
        expect(result).toEqual(initialState);
    });
});