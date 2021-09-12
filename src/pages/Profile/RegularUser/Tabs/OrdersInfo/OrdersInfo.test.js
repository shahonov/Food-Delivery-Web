import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';

import OrdersInfo from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import OrderInfoCard from './Card/OrderInfoCard';
import { GET_USER_ORDERS_SUCCESS, SIGN_IN_SUCCESS } from 'data/actionTypes';

const now = Date.now();
const hourLater = new Date();
hourLater.setHours(hourLater.getHours() + 1);
const later = hourLater.getTime();

const user = {
    _id: 123,
    role: roles.regularUser
}
const orders = [
    {
        restaurantName: 'Test1',
        restaurantId: 123,
        orderTime: now,
        meals: [
            {
                price: 20,
                quantity: 5
            },
            {
                price: 10,
                quantity: 5
            }
        ]
    },
    {
        restaurantName: 'Test2',
        restaurantId: 321,
        orderTime: later,
        meals: [
            {
                price: 10,
                quantity: 3
            },
            {
                price: 5,
                quantity: 5
            }
        ]
    }
]

beforeEach(() => {
    store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    store.dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: orders });
});

describe('OrdersInfo', () => {
    it('should render two order info cards', () => {
        const component = create(
            <Provider store={store}>
                <OrdersInfo />
            </Provider>
        );
        const cards = component.root.findAllByType(OrderInfoCard);
        expect(cards.length).toEqual(2);
    });
});
