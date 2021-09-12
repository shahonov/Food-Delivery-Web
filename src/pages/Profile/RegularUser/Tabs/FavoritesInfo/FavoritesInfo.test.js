import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';

import FavoritesInfo from '.';
import { store } from 'data/store';
import FavoriteRestaurantCard from './Card';

const removeFromFavs = jest.fn();

describe('FavoritesInfo', () => {
    it('should display 3 favorite cards', () => {
        const user = {
            favoriteRestaurants: [
                { _id: 1 },
                { _id: 2 },
                { _id: 3 },
            ]
        }
        const component = create(
            <Provider store={store}>
                <FavoritesInfo user={user} removeFromFavorites={removeFromFavs} />
            </Provider>
        );
        const cards = component.root.findAllByType(FavoriteRestaurantCard);
        const phantoms = cards.filter(x => x.props.phantom);
        expect(cards.length).toEqual(3);
        expect(phantoms.length).toEqual(0);
    });

    it('should show 6 favorite cards / 2 of which phantoms', () => {
        const user = {
            favoriteRestaurants: [
                { _id: 1 },
                { _id: 2 },
                { _id: 3 },
                { _id: 4 },
            ]
        }
        const component = create(
            <Provider store={store}>
                <FavoritesInfo user={user} removeFromFavorites={removeFromFavs} />
            </Provider>
        );
        const cards = component.root.findAllByType(FavoriteRestaurantCard);
        const phantoms = cards.filter(x => x.props.phantom);
        expect(cards.length).toEqual(6);
        expect(phantoms.length).toEqual(2);
    });

    it('should show 6 favorite cards / 1 of which phantom', () => {
        const user = {
            favoriteRestaurants: [
                { _id: 1 },
                { _id: 2 },
                { _id: 3 },
                { _id: 4 },
                { _id: 5 },
            ]
        }
        const component = create(
            <Provider store={store}>
                <FavoritesInfo user={user} removeFromFavorites={removeFromFavs} />
            </Provider>
        );
        const cards = component.root.findAllByType(FavoriteRestaurantCard);
        const phantoms = cards.filter(x => x.props.phantom);
        expect(cards.length).toEqual(6);
        expect(phantoms.length).toEqual(1);
    });
});
