import React from 'react';
import { create } from 'react-test-renderer';

import { store } from 'data/store';
import { GET_OWNER_MEALS, SIGN_IN_SUCCESS } from 'data/actionTypes';
import { roles } from 'global/roles';
import { Provider } from 'react-redux';
import MenuInfo from '.';
import { TableBody, TableRow } from '@material-ui/core';

const user = {
    _id: 123,
    role: roles.restaurantOwner
};
const meals = {
    all: [
        {
            _id: 123,
            mealName: 'Pizza',
            price: 10,
            netWeight: 400,
            unsplashPhotoUrl: 'test1'
        },
        {
            _id: 321,
            mealName: 'Soup',
            price: 4,
            netWeight: 200,
            unsplashPhotoUrl: 'test2'
        }
    ],
    totalCount: 2
}

beforeEach(() => {
    store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    store.dispatch({ type: GET_OWNER_MEALS, payload: meals });
});

describe('MenuInfo', () => {
    it('should render three meal rows', () => {
        const component = create(
            <Provider store={store}>
                <MenuInfo />
            </Provider>
        );
        const tbody = component.root.findByType(TableBody);
        const rows = tbody.findAllByType(TableRow);
        expect(rows.length).toEqual(3);
    });
});
