import React from 'react';
import { Slide } from "react-reveal";
import { connect } from "react-redux";

import OrderInfoText from "../components/OrderInfoText";
import AccountInfoTextOwner from '../components/AccountInfoTextOwner';
import { orderStatuses } from "constants/orderStatuses/orderStatuses";

import './HomeRestaurantOwner.scss';

const HomeRestaurantOwner = ({ orders, user }) => {

    const fillAccountInfoText = user => {
        if (
            !user.phone ||
            !user.slogan ||
            !user.address ||
            !user.kitchenType ||
            !user.restaurantName ||
            !user.freeDeliveryThreshold
        ) {
            return (
                <Slide top duration={300}>
                    <AccountInfoTextOwner />
                </Slide>
            );
        } else {
            return false;
        }
    }

    const checkOrdersText = orders => {
        const nodes = [];
        const placedOrders = orders.filter(x => x.status === orderStatuses.placed);
        const processingOrders = orders.filter(x => x.status === orderStatuses.processing);
        const deliveringOrders = orders.filter(x => x.status === orderStatuses.inRoute);

        if (placedOrders.length > 0) {
            nodes.push(<OrderInfoText key={1} status={orderStatuses.placed} count={placedOrders.length} />);
        }

        if (processingOrders.length > 0) {
            nodes.push(<OrderInfoText key={2} status={orderStatuses.processing} count={processingOrders.length} />);
        }

        if (deliveringOrders.length > 0) {
            nodes.push(<OrderInfoText key={3} status={orderStatuses.inRoute} count={deliveringOrders.length} />);
        }

        return <div className='orders-info-wrapper'>{nodes}</div>;
    }

    return (
        <div className='home-restaurant-owner-container'>
            {fillAccountInfoText(user)}
            <Slide bottom duration={300}>
                {checkOrdersText(orders)}
            </Slide>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    orders: state.orders.all
})

const mapDispatchToPorps = {}

export default connect(mapStateToProps, mapDispatchToPorps)(HomeRestaurantOwner);
