import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Slide } from "react-reveal";
import { Pagination } from "@material-ui/lab";
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
    totalMealsCount,
    getRestaurantOwnerMeals
}) => {
    const paginationStep = 9;
    const pagesCount = Math.ceil(totalMealsCount / paginationStep);

    const { restaurantId, restaurantName } = useParams();

    const [name, setName] = useState('');
    const [mealType, setMealType] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getRestaurantOwnerMeals(
                restaurantId,
                (page - 1) * paginationStep,
                ((page - 1) * paginationStep) + paginationStep
            );
            setLoading(false);
        })();
    }, [getRestaurantOwnerMeals, restaurantId, page]);

    const handleChangePage = (ev, page) => setPage(page);
    const handleNameChange = ev => setName(ev.target.value);
    const handleAddressChange = ev => setMealType(ev.target.value);

    const filteredData = filterData(meals, [
        {
            propName: 'mealName',
            value: name
        },
        {
            propName: 'mealType',
            value: mealType
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
                            value={mealType}
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
                            {
                                pagesCount > 1 &&
                                <div className='pagination-container'>
                                    <Pagination
                                        page={page}
                                        size='large'
                                        shape='rounded'
                                        color='secondary'
                                        variant='outlined'
                                        count={pagesCount}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            }
                        </div>
                    </Slide>
                </div>
            </Slide>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    meals: state.meals.all,
    totalMealsCount: state.meals.totalCount
})

const mapDispatchToPorps = { getRestaurantOwnerMeals, addMealToCart }

export default connect(mapStateToProps, mapDispatchToPorps)(RestaurantFoods);
