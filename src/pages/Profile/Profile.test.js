import React from 'react';
import { Provider } from 'react-redux';
import { Tab } from '@material-ui/core';
import { act, create } from 'react-test-renderer';

import Profile from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import { SIGN_IN_SUCCESS } from 'data/actionTypes';

describe('Profile', () => {
    it('should render regular user profile page', () => {
        act(() => {
            const user = { _id: 123, role: roles.regularUser };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        })
        const component = create(<Provider store={store}><Profile /></Provider>);
        const tabs = component.root.findAllByType(Tab);
        expect(tabs.length).toEqual(3);
    });

    it('should render restaurant owner profile page', () => {
        act(() => {
            const user = { _id: 123, role: roles.restaurantOwner };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        })
        const component = create(<Provider store={store}><Profile /></Provider>);
        const tabs = component.root.findAllByType(Tab);
        expect(tabs.length).toEqual(5);
    });
});
