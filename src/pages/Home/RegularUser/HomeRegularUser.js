import React, { useEffect } from 'react';
import { Slide } from "react-reveal";
import { connect } from "react-redux";

import OrderInfoText from '../components/OrderInfoText';
import { getRegularUserOrders } from 'data/actions/ordersActions';
import AccountInfoTextUser from '../components/AccountInfoTextUser';
import { orderStatuses } from "constants/orderStatuses/orderStatuses";

import './HomeRegularUser.scss';

const HomeRegularUser = ({ orders, user, getRegularUserOrders }) => {

    useEffect(() => {
        getRegularUserOrders(user._id);
    }, [getRegularUserOrders, user]);

    const fillAccountInfoText = user => {
        const nodes = [];

        if (!user.firstName && !user.lastName && !user.deliveryAddress) {
            nodes.push(<AccountInfoTextUser key={1} fields='First name, Last name and Delivery address' />);
        } else {
            if (!user.firstName && !user.lastName && user.deliveryAddress) {
                nodes.push(<AccountInfoTextUser key={1} fields='First name and Last name' />);
            } else if (user.firstName && !user.lastName && !user.deliveryAddress) {
                nodes.push(<AccountInfoTextUser key={1} fields='Last name and Delivery address' />);
            } else if (!user.firstName && user.lastName && !user.deliveryAddress) {
                nodes.push(<AccountInfoTextUser key={1} fields='First name and Delivery address' />);
            } else {
                if (!user.firstName) {
                    nodes.push(<AccountInfoTextUser key={1} fields='First name' />);
                }
                if (!user.lastName) {
                    nodes.push(<AccountInfoTextUser key={1} fields='Last name' />);
                }
                if (!user.deliveryAddress) {
                    nodes.push(<AccountInfoTextUser key={1} fields='Delivery address' />);
                }
            }
        }

        return <div className='account-info-wrapper'>{nodes}</div>;
    }

    const checkOrdersText = orders => {
        const nodes = [];
        const processingOrders = orders.filter(x => x.status === orderStatuses.processing);
        const deliveringOrders = orders.filter(x => x.status === orderStatuses.inRoute);
        const deliveredOrders = orders.filter(x => x.status === orderStatuses.delivered);

        if (processingOrders.length > 0) {
            nodes.push(<OrderInfoText key={1} status={orderStatuses.processing} count={processingOrders.length} />);
        }

        if (deliveringOrders.length > 0) {
            nodes.push(<OrderInfoText key={2} status={orderStatuses.inRoute} count={deliveringOrders.length} />);
        }

        if (deliveredOrders.length > 0) {
            nodes.push(<OrderInfoText key={3} status={orderStatuses.delivered} count={deliveredOrders.length} />);
        }

        return <div className='orders-info-wrapper'>{nodes}</div>;
    }

    return (
        <div className='home-regular-user-container'>
            <Slide top duration={300}>
                {fillAccountInfoText(user)}
            </Slide>
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

const mapDispatchToPorps = { getRegularUserOrders }

export default connect(mapStateToProps, mapDispatchToPorps)(HomeRegularUser);
