import React from 'react';
import { Provider } from 'react-redux';
import { create, act } from 'react-test-renderer';

import Home from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from 'data/actionTypes';

describe('Home', () => {
    it('should render regular user home view', async () => {
        const user = { role: roles.regularUser };
        await act(async () => {
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><Home /></Provider>);
        const count = component.root.findAllByProps({ className: 'home-regular-user-container' }).length;
        expect(count).toEqual(1);
    });

    it('should render restaurant owner home view', async () => {
        const user = { role: roles.restaurantOwner };
        await act(async () => {
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><Home /></Provider>);
        const count = component.root.findAllByProps({ className: 'home-restaurant-owner-container' }).length;
        expect(count).toEqual(1);
    });

    it('should render regular user home view', async () => {
        act(() => {
            store.dispatch({ type: SIGN_OUT_SUCCESS });
        });
        const component = create(<Provider store={store}><Home /></Provider>);
        const count = component.root.findAllByProps({ className: 'home-guest-container' }).length;
        expect(count).toEqual(1);
    });
});
