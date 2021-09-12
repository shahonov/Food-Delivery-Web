import React from 'react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';

import RegularUser from '.';
import { store } from 'data/store';
import { roles } from 'global/roles';
import OrderInfoText from '../components/OrderInfoText';
import AccountInfoTextUser from '../components/AccountInfoTextUser';
import { orderStatuses } from 'constants/orderStatuses/orderStatuses';
import { GET_USER_ORDERS_SUCCESS, SIGN_IN_SUCCESS } from 'data/actionTypes';

beforeEach(() => {
    act(() => {
        const user = {
            _id: 123,
            role: roles.regularUser,
            firstName: 'Test1',
            lastName: 'Test2',
            deliveryAddress: 'Some random address'
        };
        const userAction = { type: SIGN_IN_SUCCESS, payload: user };
        store.dispatch(userAction);

        const orders = [
            { status: orderStatuses.processing },
            { status: orderStatuses.processing },
            { status: orderStatuses.delivered },
            { status: orderStatuses.inRoute },
        ]
        const orderAction = { type: GET_USER_ORDERS_SUCCESS, payload: orders };
        store.dispatch(orderAction);
    });
});

describe('RegularUser', () => {
    it('should render three messages for pending orders', () => {
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const orderComponents = component.root.findAllByType(OrderInfoText);
        expect(orderComponents.length).toEqual(3);
    });

    it('should render message for all account fields', async () => {
        await act(async () => {
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: {} });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('First name, Last name and Delivery address');
    });

    it('should render message for firstName account fields', async () => {
        await act(async () => {
            const user = { lastName: 'asd', deliveryAddress: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('First name');
    });

    it('should render message for lastName account fields', async () => {
        await act(async () => {
            const user = { firstName: 'asd', deliveryAddress: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('Last name');
    });

    it('should render message for deliveryAddress account fields', async () => {
        await act(async () => {
            const user = { firstName: 'asd', lastName: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('Delivery address');
    });

    it('should render message for firstName and lastName account fields', async () => {
        await act(async () => {
            const user = { deliveryAddress: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('First name and Last name');
    });

    it('should render message for firstName and deliveryAddress account fields', async () => {
        await act(async () => {
            const user = { lastName: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('First name and Delivery address');
    });

    it('should render message for lastName and deliveryAddress account fields', async () => {
        await act(async () => {
            const user = { firstName: 'asd' };
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        });
        const component = create(<Provider store={store}><RegularUser /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextUser);
        expect(accountComponents.length).toEqual(1);
        expect(accountComponents[0].props.fields).toEqual('Last name and Delivery address');
    });
});
