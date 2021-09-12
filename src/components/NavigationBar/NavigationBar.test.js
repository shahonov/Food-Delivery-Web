import React from 'react';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';
import { create, act } from 'react-test-renderer';

import NavigationBar from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import { SIGN_IN_SUCCESS } from 'data/actionTypes';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => {
            return {
                push: mockHistoryPush
            };
        }
    }
});

beforeEach(() => {
    act(() => {
        store.dispatch({ type: SIGN_IN_SUCCESS, payload: {} });
    });
});

describe('NavigationBar', () => {
    it('should show guest navigation menu items', () => {
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        expect(navMenuItems.length).toEqual(3);
        expect(navMenuItems.map(x => x.props.children)).toEqual(['Restaurants', 'Login', 'Register']);
    });

    it('should show regular user navigation menu items', () => {
        act(() => {
            const user = {
                _id: 123,
                role: roles.regularUser
            };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const allMenuItems = navMenuItems.map(x => x.props.children);
        expect(navMenuItems.length).toEqual(4);
        expect(allMenuItems).toEqual(['Restaurants', 'Cart', 'Profile', 'Log out']);
    });

    it('should show restaurant owner navigation menu items', () => {
        act(() => {
            const user = {
                _id: 123,
                role: roles.restaurantOwner
            };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const allMenuItems = navMenuItems.map(x => x.props.children);
        expect(navMenuItems.length).toEqual(4);
        expect(allMenuItems).toEqual(['Restaurants', 'Orders', 'Profile', 'Log out']);
    });

    it('should call history.push with index', () => {
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const homeBtn = component.root.findByProps({ className: 'home-btn' });
        homeBtn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

    it('should call history.push with restaurants', () => {
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const btn = navMenuItems.filter(x => x.props.children === 'Restaurants')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/restaurants');
    });

    it('should call history.push with login', () => {
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const btn = navMenuItems.filter(x => x.props.children === 'Login')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/sign-in');
    });

    it('should call history.push with register', () => {
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const btn = navMenuItems.filter(x => x.props.children === 'Register')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/sign-up');
    });

    it('should call history.push with cart', () => {
        act(() => {
            const user = { _id: 123, role: roles.regularUser };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const btn = navMenuItems.filter(x => x.props.children === 'Cart')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/cart');
    });

    it('should call history.push with profile', () => {
        act(() => {
            const user = { _id: 123, role: roles.regularUser };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        let component = create(<Provider store={store}><NavigationBar /></Provider>);
        let navMenuItems = component.root.findAllByType(Button);
        let btn = navMenuItems.filter(x => x.props.children === 'Profile')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/profile');

        act(() => {
            const user = { _id: 321, role: roles.restaurantOwner };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        component = create(<Provider store={store}><NavigationBar /></Provider>);
        navMenuItems = component.root.findAllByType(Button);
        btn = navMenuItems.filter(x => x.props.children === 'Profile')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
    });

    it('should call history.push with orders', () => {
        act(() => {
            const user = { _id: 123, role: roles.restaurantOwner };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><NavigationBar /></Provider>);
        const navMenuItems = component.root.findAllByType(Button);
        const btn = navMenuItems.filter(x => x.props.children === 'Orders')[0];
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/orders');
    });

    it('should call signOut', async () => {
        act(() => {
            const user = { _id: 123, role: roles.regularUser };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        let component = create(<Provider store={store}><NavigationBar /></Provider>);
        let navMenuItems = component.root.findAllByType(Button);
        let btn = navMenuItems.filter(x => x.props.children === 'Log out')[0];
        await btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/');

        act(() => {
            const user = { _id: 321, role: roles.restaurantOwner };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        component = create(<Provider store={store}><NavigationBar /></Provider>);
        navMenuItems = component.root.findAllByType(Button);
        btn = navMenuItems.filter(x => x.props.children === 'Log out')[0];
        await btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
});
