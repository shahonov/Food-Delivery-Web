import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';

import UsersInfo from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import { GET_OWNER_ORDERS_SUCCESS, SIGN_IN_SUCCESS } from 'data/actionTypes';
import { orderStatuses } from 'constants/orderStatuses/orderStatuses';
import { TableBody, TableRow } from '@material-ui/core';

const user = {
    _id: 123,
    blockedUsers: [],
    role: roles.restaurantOwner
};
const orders = [
    {
        clientId: 123,
        status: orderStatuses.delivered,
        meals: [
            {
                price: 10,
                quantity: 5
            },
            {
                price: 8,
                quantity: 5
            }
        ]
    },
    {
        clientId: 321,
        status: orderStatuses.received,
        meals: [
            {
                price: 15,
                quantity: 2
            },
            {
                price: 20,
                quantity: 2
            }
        ]
    }
];

beforeEach(() => {
    store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    store.dispatch({ type: GET_OWNER_ORDERS_SUCCESS, payload: orders });
});

describe('UsersInfo', () => {
    it('should render two user rows', () => {
        const component = create(
            <Provider store={store}>
                <UsersInfo />
            </Provider>
        );
        const tbody = component.root.findByType(TableBody);
        const rows = tbody.findAllByType(TableRow);
        expect(rows.length).toEqual(2);
    });
});
