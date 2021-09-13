/* istanbul ignore file */

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import { TextField, Typography } from '@material-ui/core';

import Restaurant from './Restaurant';
import { getRestaurants } from 'data/actions/restaurantsActions';
import { addRestaurantToFavorites, removeRestaurantFromFavorites } from 'data/actions/userActions';

import './Restaurants.scss';

const filterData = (data, filters) => {
    const predicate = (item, propName, field) => item[propName]?.toLowerCase().includes(field.toLowerCase());
    let filteredData = data?.slice() || [];
    for (const filter of filters) {
        filteredData = filteredData.filter(x => predicate(x, filter.propName, filter.value));
    }
    return filteredData;
}

const Restaurants = ({
    user,
    restaurants,
    getRestaurants,
    restaurantsCount,
    totalRestaurantsCount,
    addRestaurantToFavorites,
    removeRestaurantFromFavorites
}) => {
    const [loading, setLoading] = useState(false);
    const [kitchenType, setKitchenType] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getRestaurants();
            setLoading(false);
        })();
    }, [getRestaurants]);

    const handleKitchenTypeChange = ev => setKitchenType(ev.target.value);
    const handleNameChange = ev => setName(ev.target.value);
    const handleAddressChange = ev => setAddress(ev.target.value);

    const allowedRestaurants = restaurants.filter(x => !x.blockedUsers.includes(user._id));
    const filteredData = filterData(allowedRestaurants, [
        {
            propName: 'restaurantName',
            value: name
        },
        {
            propName: 'address',
            value: address
        },
        {
            propName: 'kitchenType',
            value: kitchenType
        },
        {
            propName: 'slogan',
            value: ''
        },
        {
            propName: 'freeDeliveryThreshold',
            value: ''
        },
        {
            propName: 'phone',
            value: ''
        }
    ]);

    // insert phantom nodes so the last row cards to be left-aligned
    // because of display:flex and justify-content:space-between
    if (filteredData.length % 3 === 2) {
        filteredData.push({ phantom: true });
    } else if (filteredData.length % 3 === 1) {
        filteredData.push({ phantom: true }, { phantom: true });
    }

    const realData = filteredData.filter(x => !x.phantom);
    return (
        loading
            ?
            <Typography className='syncopate' align='center'>Loading...</Typography>
            :
            <Slide top duration={300} cascade>
                <div className='restaurants-container' >
                    <div className='filters-container'>
                        <TextField
                            size='small'
                            value={name}
                            variant='outlined'
                            className='special'
                            label='Search by name'
                            placeholder='Type name'
                            onChange={handleNameChange}
                        />
                        <TextField
                            size='small'
                            variant='outlined'
                            value={kitchenType}
                            className='special'
                            label='Search by kitchen type'
                            placeholder='Type kitchen type'
                            onChange={handleKitchenTypeChange}
                        />
                        <TextField
                            size='small'
                            value={address}
                            variant='outlined'
                            className='special'
                            label='Search by address'
                            placeholder='Type address'
                            onChange={handleAddressChange}
                        />
                    </div>
                    <Typography
                        align='center'
                        className='syncopate found-label'
                    >
                        Restaurants found: {realData.length}
                    </Typography>
                    <Slide bottom duration={300}>
                        <div>
                            <div className='rastaurants-cards-container'>
                                {
                                    filteredData.map((x, i) => {
                                        const isFavorite = !!user.favoriteRestaurants.find(xx => xx._id === x._id);
                                        return (
                                            <Restaurant
                                                {...x}
                                                key={i}
                                                user={user}
                                                isFavorite={isFavorite}
                                                addToFavorites={addRestaurantToFavorites}
                                                removeFromFavorites={removeRestaurantFromFavorites}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Slide>
                </div>
            </Slide>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    restaurants: state.restaurants.all
});

const mapDispatchToPorps = {
    getRestaurants,
    addRestaurantToFavorites,
    removeRestaurantFromFavorites
};

export default connect(mapStateToProps, mapDispatchToPorps)(Restaurants);
