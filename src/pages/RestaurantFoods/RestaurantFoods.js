/* istanbul ignore file */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Slide } from "react-reveal";
import { TextField, Typography } from "@material-ui/core";

import { addMealToCart } from "data/actions/cartActions";
import RestaurantFood from "./RestaurantFood/RestaurantFood";
import { getRestaurantOwnerMeals } from "data/actions/mealsActions";

import './RestaurantFoods.scss';

const filterData = (data, filters) => {
    const predicate = (item, propName, field) => item[propName]?.toLowerCase().includes(field.toLowerCase());
    let filteredData = data?.slice() || [];
    for (const filter of filters) {
        filteredData = filteredData.filter(x => predicate(x, filter.propName, filter.value));
    }
    return filteredData;
}

const RestaurantFoods = ({
    user,
    meals,
    addMealToCart,
    getRestaurantOwnerMeals
}) => {
    const { restaurantId, restaurantName } = useParams();

    const [name, setName] = useState('');
    const [maximumPrice, setMaximumPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getRestaurantOwnerMeals(restaurantId);
            setLoading(false);
        })();
    }, [getRestaurantOwnerMeals, restaurantId]);

    const handleNameChange = ev => setName(ev.target.value);
    const handleMaxPriceChange = ev => setMaximumPrice(
        !isNaN(ev.target.value) && ev.target.value !== ''
            ? +ev.target.value
            : ''
    );

    const filteredData = filterData(meals, [
        {
            propName: 'mealName',
            value: name
        }
    ])
        .sort((a, b) => a.orderId - b.orderId)
        .filter(x => {
            if (maximumPrice && !isNaN(maximumPrice)) {
                return +x.price <= maximumPrice
            } else {
                return true;
            }
        });

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
                <div className='meals-container'>
                    <Typography
                        variant='h4'
                        align='center'
                        className='syncopate restaurant-name'
                    >
                        {restaurantName}
                    </Typography>
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
                            className='special'
                            value={maximumPrice}
                            label='Maximum price'
                            onChange={handleMaxPriceChange}
                            placeholder='Type maximum price'
                        />
                    </div>
                    <Typography
                        align='center'
                        className='syncopate found-label'
                    >
                        Meals found: {realData.length}
                    </Typography>
                    <Slide bottom duration={300}>
                        <div>
                            <div className='meals-cards-container'>
                                {
                                    filteredData.map((x, i) => {
                                        return (
                                            <RestaurantFood
                                                {...x}
                                                key={i}
                                                user={user}
                                                restaurantId={restaurantId}
                                                addMealToCart={addMealToCart}
                                                restaurantName={restaurantName}
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
    meals: state.meals.all
})

const mapDispatchToPorps = { getRestaurantOwnerMeals, addMealToCart }

export default connect(mapStateToProps, mapDispatchToPorps)(RestaurantFoods);
