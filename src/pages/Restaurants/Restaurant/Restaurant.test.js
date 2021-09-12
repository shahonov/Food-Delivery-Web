import React from 'react';
import { create } from 'react-test-renderer';
import { Button, IconButton } from '@material-ui/core';
import {
    Favorite,
    FavoriteBorderOutlined
} from '@material-ui/icons';

import Restaurant from '.';

const addToFavs = jest.fn();
const removeFromFavs = jest.fn();

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

describe('Restaurant', () => {
    it('should show sign in button when user is not signed in', () => {
        const component = create(
            <Restaurant
                _id={123}
                user={{}}
                phone={'0880'}
                phantom={false}
                isFavorite={true}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                restaurantName={'Chineese Hub'}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(Button);
        expect(btn.props.fullWidth).toBeTruthy();
        expect(btn.props.color).toEqual('primary');
        expect(btn.props.variant).toEqual('contained');
        expect(btn.props.children).toEqual('Sign in to view meals');
    });

    it('should show view meals button when user is signed in', () => {
        const component = create(
            <Restaurant
                _id={123}
                phone={'0880'}
                phantom={false}
                isFavorite={true}
                user={{ _id: 123 }}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                restaurantName={'Chineese Hub'}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(Button);
        expect(btn.props.fullWidth).toBeTruthy();
        expect(btn.props.color).toEqual('primary');
        expect(btn.props.variant).toEqual('contained');
        expect(btn.props.children).toEqual('View meals');
    });

    it('should show favorite icon when isFavorite is true', () => {
        const component = create(
            <Restaurant
                _id={123}
                user={{}}
                phone={'0880'}
                phantom={false}
                isFavorite={true}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                restaurantName={'Chineese Hub'}
                removeFromFavorites={removeFromFavs}
            />
        );
        const favIcon = component.root.findAllByType(Favorite);
        expect(favIcon.length).toEqual(1);
    });

    it('should show not favorite icon when isFavorite is false', () => {
        const component = create(
            <Restaurant
                _id={123}
                user={{}}
                phone={'0880'}
                phantom={false}
                isFavorite={false}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                restaurantName={'Chineese Hub'}
                removeFromFavorites={removeFromFavs}
            />
        );
        const favIcon = component.root.findAllByType(FavoriteBorderOutlined);
        expect(favIcon.length).toEqual(1);
    });

    it('should call history.push with sign in', () => {
        const component = create(
            <Restaurant
                _id={123}
                user={{}}
                phone={'0880'}
                phantom={false}
                isFavorite={true}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                restaurantName={'Chineese Hub'}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(Button);
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/sign-in');
    });

    it('should call history.push with dynamic restaurant meals endpoint', () => {
        const component = create(
            <Restaurant
                _id={123}
                phone={'0880'}
                phantom={false}
                isFavorite={true}
                user={{ _id: 321 }}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                restaurantName={'Test'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(Button);
        btn.props.onClick();
        expect(mockHistoryPush).toHaveBeenCalledWith('/foods/Test/123');
    });

    it('should render only card with zero elevation when phantom', () => {
        const component = create(
            <Restaurant
                _id={123}
                phone={'0880'}
                phantom={true}
                isFavorite={true}
                user={{ _id: 321 }}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                restaurantName={'Test'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                removeFromFavorites={removeFromFavs}
            />
        );
        const card = component.root.findByProps({ className: 'restaurant-card' });
        expect(card.props.elevation).toEqual(0);
    });

    it('should call addToFavorites when is not in favorites', () => {
        const user = {
            _id: 321,
            favoriteRestaurants: [{ _id: 111 }, { _id: 112 }]
        }
        const component = create(
            <Restaurant
                _id={123}
                user={user}
                phone={'0880'}
                phantom={false}
                isFavorite={false}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                restaurantName={'Test'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(IconButton);
        btn.props.onClick();
        expect(addToFavs).toHaveBeenCalled();
    });

    it('should call removeFromFavorites when is in favorites', () => {
        const user = {
            _id: 321,
            favoriteRestaurants: [{ _id: 111 }, { _id: 123 }]
        }
        const component = create(
            <Restaurant
                _id={123}
                user={user}
                phone={'0880'}
                phantom={false}
                isFavorite={false}
                kitchenType={'asian'}
                slogan={'test-slogan'}
                restaurantName={'Test'}
                address={'test-address'}
                freeDeliveryThreshold={50}
                addToFavorites={addToFavs}
                removeFromFavorites={removeFromFavs}
            />
        );
        const btn = component.root.findByType(IconButton);
        btn.props.onClick();
        expect(removeFromFavs).toHaveBeenCalled();
    });
});
