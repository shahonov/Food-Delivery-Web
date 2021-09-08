import { connect } from "react-redux"
import { Slide } from "react-reveal";
import { Typography } from "@material-ui/core";

import { orderStatuses } from "constants/orderStatuses/orderStatuses";

import './RestaurantOwner.scss';

const AccountInfoText = () => {
    return (
        <Typography
            className='syncopate account-info-text'
            align='center'
            variant='h6'
        >
            Fill your <strong>Profile</strong> information so we can <strong>include</strong> your <strong>business</strong> in <strong>Restaurants</strong> section
        </Typography>
    )
}

const OrderInfoText = ({ status, count }) => {
    return (
        <div className='orders-info'>
            <Typography
                className='syncopate orders-info-count'
                align='center'
                variant='h3'
            >
                <strong>{count}</strong>
            </Typography>
            <Typography
                className='syncopate orders-info-text'
                align='center'
                variant='h5'
            >
                {count === 1 ? 'Order' : 'Orders'} with <strong>{status}</strong> status, check in <strong>Orders</strong>
            </Typography>
        </div>
    )
}

const RestaurantOwner = ({ orders, user }) => {

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
                    <AccountInfoText />
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
        <div>
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

export default connect(mapStateToProps, mapDispatchToPorps)(RestaurantOwner);
