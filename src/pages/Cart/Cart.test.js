import React from 'react';
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core';
import { create, act } from 'react-test-renderer';

import Cart from '.';
import { store } from 'data/store';
import RestaurantOrderCard from './Card';
import { ADD_MEAL_TO_CART_SUCCESS, CLEAR_CART_SUCCESS } from 'data/actionTypes';

const meals = [
    {
        _id: 123,
        mealName: 'Pizza',
        mealType: 'pizza',
        netWeight: 400,
        price: 10,
        restaurantName: 'First'
    },
    {
        _id: 456,
        mealName: 'Chicken soup',
        mealType: 'soup',
        netWeight: 300,
        price: 5,
        restaurantName: 'Second'
    },
    {
        _id: 789,
        mealName: 'Brownie',
        mealType: 'desert',
        netWeight: 200,
        price: 6,
        restaurantName: 'Third'
    }
]

beforeEach(() => {
    act(() => {
        for (const meal of meals) {
            store.dispatch({ type: ADD_MEAL_TO_CART_SUCCESS, payload: meal });
        }
    });
})

describe('Cart', () => {
    it('should show empty cart message', () => {
        const component = create(<Provider store={store}><Cart /></Provider>);
        act(() => {
            store.dispatch({ type: CLEAR_CART_SUCCESS });
        });
        const emptyCartMessage = component.root.findAllByType(Typography)[1];
        expect(emptyCartMessage.props.children).toEqual('Your cart is empty');
    });

    it('should contain three pending order cards', () => {
        const component = create(<Provider store={store}><Cart /></Provider>);
        const orderCards = component.root.findAllByType(RestaurantOrderCard);
        expect(orderCards.length).toEqual(3);
    });
});
