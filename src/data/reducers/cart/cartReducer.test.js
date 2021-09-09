import {
    REMOVE_MEAL_FROM_CART_SUCCESS,
    ADD_MEAL_TO_CART_SUCCESS,
    CLEAR_CART_SUCCESS
} from "data/actionTypes";
import { cartReducer } from "./cartReducer";

let initialState = {};
beforeEach(() => {
    initialState = {
        meals: []
    }
});

describe('cartReducer', () => {
    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = cartReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return initial state when clean cart action type', () => {
        const action = { type: CLEAR_CART_SUCCESS };
        const result = cartReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return updated cart when remove meal action type', () => {
        initialState = {
            meals: [
                {
                    _id: 1122,
                    name: 'pizza'
                },
                {
                    _id: 3344,
                    name: 'soup'
                }
            ]
        }
        const payload = 1122;
        const action = { type: REMOVE_MEAL_FROM_CART_SUCCESS, payload };
        const result = cartReducer(initialState, action);
        const expected = {
            meals: [
                {
                    _id: 3344,
                    name: 'soup'
                }
            ]
        }
        expect(result).toEqual(expected);
    });

    it('should return updated cart when add meal to cart action type and meal is not yet listed', () => {
        const payload = {
            _id: 123,
            name: 'pizza',
            quantity: 3
        };
        const action = { type: ADD_MEAL_TO_CART_SUCCESS, payload };
        const result = cartReducer(initialState, action);
        expect(result).toEqual({ meals: [payload] });
    });

    it('should return updated cart with same meal, more quantity when add meal to cart action type and meal is already listed', () => {
        initialState = {
            meals: [
                {
                    _id: 123,
                    quantity: 2
                }
            ]
        }
        const payload = {
            _id: 123,
            quantity: 1
        };
        const action = { type: ADD_MEAL_TO_CART_SUCCESS, payload };
        const result = cartReducer(initialState, action);
        const expected = {
            meals: [
                {
                    _id: 123,
                    quantity: 3
                }
            ]
        }
        expect(result).toEqual(expected);
    });
});
