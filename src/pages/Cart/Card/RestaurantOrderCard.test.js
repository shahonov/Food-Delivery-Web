import React from 'react';
import { Provider } from 'react-redux';
import { create, act } from 'react-test-renderer';

import { store } from 'data/store';
import RestaurantOrderCard from './RestaurantOrderCard';
import { Button } from '@material-ui/core';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        useHistory: () => {
            return {
                push: mockHistoryPush
            }
        }
    }
});

let user = {};
let restaurantMeals = [];
const onRemoveOrder = jest.fn();
const onCreateOrder = jest.fn();
beforeEach(() => {
    user = {
        firstName: 'Martin',
        lastName: 'Shahonov',
        phone: '0887777880',
        deliveryAddress: 'test'
    }
    restaurantMeals = [
        {
            _id: 123,
            price: 10,
            netWeight: 400,
            mealType: 'Pizza',
            mealName: 'Peperoni'
        }
    ]
});

describe('RestaurantOrderCard', () => {
    it('should show fill profile information button when profile information is not full', () => {
        delete user.phone;
        const component = create(
            <Provider store={store}>
                <RestaurantOrderCard
                    user={user}
                    name='McDonalds'
                    onCreateOrder={onCreateOrder}
                    onRemoveFromCart={onRemoveOrder}
                    restaurantMeals={restaurantMeals}
                />
            </Provider>
        );
        const btns = component.root.findAllByType(Button);
        expect(btns[1].props.children).toEqual('Fill in your Profile Information so you can place an order');
    });

    it('should show create order button', () => {
        const component = create(
            <Provider store={store}>
                <RestaurantOrderCard
                    user={user}
                    name='McDonalds'
                    onCreateOrder={onCreateOrder}
                    onRemoveFromCart={onRemoveOrder}
                    restaurantMeals={restaurantMeals}
                />
            </Provider>
        );
        const btns = component.root.findAllByType(Button);
        expect(btns[1].props.children[0]).toEqual('Place Order For');
        expect(btns[1].props.children[1].props.children).toEqual('McDonalds');
    });

    it('should call history.push with profile', () => {
        delete user.phone;
        const component = create(
            <Provider store={store}>
                <RestaurantOrderCard
                    user={user}
                    name='McDonalds'
                    onCreateOrder={onCreateOrder}
                    onRemoveFromCart={onRemoveOrder}
                    restaurantMeals={restaurantMeals}
                />
            </Provider>
        );
        const btns = component.root.findAllByType(Button);
        act(() => {
            btns[1].props.onClick();
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
    });

    it('should call on remove order handler', () => {
        const component = create(
            <Provider store={store}>
                <RestaurantOrderCard
                    user={user}
                    name='McDonalds'
                    onCreateOrder={onCreateOrder}
                    onRemoveFromCart={onRemoveOrder}
                    restaurantMeals={restaurantMeals}
                />
            </Provider>
        );
        const btns = component.root.findAllByType(Button);
        act(() => {
            btns[0].props.onClick();
        });
        expect(onRemoveOrder).toHaveBeenCalled();
    });

    it('should call on create order handler', () => {
        const component = create(
            <Provider store={store}>
                <RestaurantOrderCard
                    user={user}
                    name='McDonalds'
                    onCreateOrder={onCreateOrder}
                    onRemoveFromCart={onRemoveOrder}
                    restaurantMeals={restaurantMeals}
                />
            </Provider>
        );
        const btns = component.root.findAllByType(Button);
        act(() => {
            btns[1].props.onClick();
        });
        expect(onCreateOrder).toHaveBeenCalled();
    });
});
