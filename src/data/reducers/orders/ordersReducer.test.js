import { orderStatuses } from "constants/orderStatuses/orderStatuses";
import {
    EDIT_ORDER_STATUS_SUCCESS,
    GET_OWNER_ORDERS_SUCCESS,
    GET_USER_ORDERS_SUCCESS,
    CREATE_ORDER_SUCCESS
} from "data/actionTypes";
import { ordersReducer } from ".";

let initialState = {};
beforeEach(() => {
    initialState = {
        all: []
    }
});

describe('ordersReducer', () => {
    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = ordersReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return updated orders object when create order action type', () => {
        const payload = { _id: 123, name: 'test-order' };
        const action = { type: CREATE_ORDER_SUCCESS, payload };
        const result = ordersReducer(initialState, action);
        const expected = { all: [...initialState.all, payload] };
        expect(result).toEqual(expected);
    });

    it('should return orders when get user orders action type', () => {
        const payload = [
            {
                _id: 123,
                name: 'order123'
            },
            {
                _id: 321,
                name: 'order321'
            }
        ];
        const action = { type: GET_USER_ORDERS_SUCCESS, payload };
        const result = ordersReducer(initialState, action);
        expect(result).toEqual({ all: payload });
    });

    it('should return orders when get owner orders action type', () => {
        const payload = [
            {
                _id: 123,
                name: 'order123'
            },
            {
                _id: 321,
                name: 'order321'
            }
        ];
        const action = { type: GET_OWNER_ORDERS_SUCCESS, payload };
        const result = ordersReducer(initialState, action);
        expect(result).toEqual({ all: payload });
    });

    it('should return updated orders when edit order status action type', () => {
        initialState = {
            all: [
                {
                    _id: 123,
                    status: orderStatuses.placed,
                    statusChangelog: []
                },
                {
                    _id: 456,
                    status: orderStatuses.processing,
                    statusChangelog: []
                }
            ]
        }
        const payload = { _id: 123, status: orderStatuses.processing, statusChangelogObj: { isOk: true } };
        const action = { type: EDIT_ORDER_STATUS_SUCCESS, payload };
        const result = ordersReducer(initialState, action);
        const expected = {
            all: [
                {
                    _id: 123,
                    status: orderStatuses.processing,
                    statusChangelog: [{ isOk: true }]
                },
                {
                    _id: 456,
                    status: orderStatuses.processing,
                    statusChangelog: []
                }
            ]
        }
        expect(result).toEqual(expected);
    });
});
