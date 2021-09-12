import React from 'react';
import { connect } from "react-redux";
import { Slide } from "react-reveal";
import { Typography } from "@material-ui/core";

import RestaurantOrderCard from "./Card";
import { createOrder } from "data/actions/ordersActions";
import { removeMealFromCart } from "data/actions/cartActions";

import './Cart.scss';

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const Cart = ({
    user,
    cartMeals,
    createOrder,
    removeMealFromCart
}) => {
    const handleRemoveFromCart = mealId => removeMealFromCart(mealId);
    const handleCreateOrder = async orderInfo => {
        const isSuccess = await createOrder(orderInfo);
        if (isSuccess) {
            for (const meal of orderInfo.meals) {
                removeMealFromCart(meal._id)
            }
        }
    }

    const generateOrdersCart = () => {
        const nodes = [];

        let index = 0;
        const restaurantNames = cartMeals.map(x => x.restaurantName).filter(onlyUnique);
        for (const name of restaurantNames) {
            const restaurantMeals = cartMeals.filter(x => x.restaurantName === name);
            nodes.push(
                <RestaurantOrderCard
                    name={name}
                    user={user}
                    key={index++}
                    onCreateOrder={handleCreateOrder}
                    restaurantMeals={restaurantMeals}
                    onRemoveFromCart={handleRemoveFromCart}
                />
            );
        }
        return nodes;
    }

    return (
        <div className='cart-container'>
            <Slide top duration={300}>
                <div>
                    <Typography className='syncopate' align='center' variant='h5'>Cart</Typography>
                    {
                        cartMeals.length === 0 &&
                        <Typography className='syncopate' align='center' variant='h6'>Your cart is empty</Typography>
                    }
                </div>
            </Slide>
            <Slide bottom duration={300}>
                <div>
                    {generateOrdersCart()}
                </div>
            </Slide>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    cartMeals: state.cart.meals
});

const mapDispatchToPorps = { removeMealFromCart, createOrder };

export default connect(mapStateToProps, mapDispatchToPorps)(Cart);
