import React from 'react';
import { store } from "data/store";
import { Provider } from "react-redux";
import { act, create } from 'react-test-renderer';

import RestaurantOwner from ".";
import { roles } from "global/roles";
import OrderInfoText from "../components/OrderInfoText";
import { orderStatuses } from 'constants/orderStatuses/orderStatuses';
import { GET_USER_ORDERS_SUCCESS, SIGN_IN_SUCCESS } from 'data/actionTypes';
import AccountInfoTextOwner from '../components/AccountInfoTextOwner';
import { Typography } from '@material-ui/core';

beforeEach(() => {
    act(() => {
        const user = {
            phone: 'not empty',
            slogan: 'not empty',
            address: 'not empty',
            kitchenType: 'not empty',
            restaurantName: 'not empty',
            freeDeliveryThreshold: 'not empty',
        };
        const userAction = { type: SIGN_IN_SUCCESS, payload: user };
        store.dispatch(userAction);

        const orders = [
            { status: orderStatuses.processing },
            { status: orderStatuses.processing },
            { status: orderStatuses.placed },
            { status: orderStatuses.inRoute },
        ]
        const orderAction = { type: GET_USER_ORDERS_SUCCESS, payload: orders };
        store.dispatch(orderAction);
    });
});

describe('RestaurantOwner', () => {
    it('should render three messages for pending orders', () => {
        const component = create(<Provider store={store}><RestaurantOwner /></Provider>);
        const orderComponents = component.root.findAllByType(OrderInfoText);
        expect(orderComponents.length).toEqual(3);
    });

    it('should render a message for all account fields', () => {
        act(() => {
            store.dispatch({ type: SIGN_IN_SUCCESS, payload: {} });
        });
        const component = create(<Provider store={store}><RestaurantOwner /></Provider>);
        const accountComponents = component.root.findAllByType(AccountInfoTextOwner);
        const typo = accountComponents[0].findByType(Typography);
        expect(typo.props.className).toEqual('syncopate account-info-text');
        expect(typo.props.align).toEqual('center');
        expect(typo.props.variant).toEqual('h6');
        expect(accountComponents.length).toEqual(1);
    });
});
