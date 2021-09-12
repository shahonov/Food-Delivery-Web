import React from 'react';
import { act, create } from 'react-test-renderer';

import RestaurantFood from '.';
import { roles } from 'global/roles';
import { Button, Card, Dialog, IconButton, TextField } from '@material-ui/core';

let user = {};
beforeEach(() => {
    user = {
        _id: 123,
        role: roles.regularUser
    };
});

const addMealToCart = jest.fn();
const photoUrl = 'https://source.unsplash.com/uU0Anw-8Vsg';

describe('RestaurantFood', () => {
    it('should display add to cart button, minus and plus quantity buttons and total price when user', async () => {
        const component = create(
            <RestaurantFood
                price={10}
                user={user}
                phantom={false}
                netWeight={400}
                restaurantId={333}
                mealType={'Pizza'}
                mealName={'Peperoni'}
                restaurantName={'PizzaLab'}
                unsplashPhotoUrl={photoUrl}
                addMealToCart={addMealToCart}
            />
        );
        const qtyInput = component.root.findAllByType(TextField);
        expect(qtyInput.length).toEqual(1);
        act(() => {
            qtyInput[0].props.onChange({ target: { value: '20' } });
        });
        const iconBtns = component.root.findAllByType(IconButton);
        expect(iconBtns.length).toEqual(3);
        const qtyBtnPlus = component.root.findByProps({ className: 'qty-icon plus' });
        const qtyBtnMinus = component.root.findByProps({ className: 'qty-icon minus' });
        act(() => {
            qtyBtnPlus.props.onClick();
            qtyBtnMinus.props.onClick();
        });
        const addBtn = component.root.findByType(Button);
        act(() => {
            addBtn.props.onClick();
        });
        expect(addMealToCart).toHaveBeenCalled();
    });

    it('should not display add to cart button, minus and plus quantity buttons and total price when owner', () => {
        user.role = roles.restaurantOwner;
        const component = create(
            <RestaurantFood
                price={10}
                user={user}
                phantom={false}
                netWeight={400}
                restaurantId={333}
                mealType={'Pizza'}
                mealName={'Peperoni'}
                restaurantName={'PizzaLab'}
                unsplashPhotoUrl={photoUrl}
                addMealToCart={addMealToCart}
            />
        );
        const qtyInput = component.root.findAllByType(TextField);
        expect(qtyInput.length).toEqual(0);
        const iconBtns = component.root.findAllByType(IconButton);
        expect(iconBtns.length).toBe(1);
    });

    it('should display only the card with 0 elevation', () => {
        const component = create(
            <RestaurantFood
                price={10}
                user={user}
                phantom={true}
                netWeight={400}
                restaurantId={333}
                mealType={'Pizza'}
                mealName={'Peperoni'}
                restaurantName={'PizzaLab'}
                unsplashPhotoUrl={photoUrl}
                addMealToCart={addMealToCart}
            />
        );
        const card = component.root.findByType(Card);
        expect(card.props.elevation).toEqual(0);
    });
});
