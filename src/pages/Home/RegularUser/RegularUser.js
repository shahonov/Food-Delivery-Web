import { connect } from "react-redux"
import { Slide } from "react-reveal";
import { Typography } from "@material-ui/core";

import { orderStatuses } from "constants/orderStatuses/orderStatuses";

import './RegularUser.scss';

const AccountInfoText = ({ fields }) => {
    return (
        <Typography
            className='syncopate account-info-text'
            align='center'
            variant='h6'
        >
            Fill your <strong>{fields}</strong> in <strong>Profile</strong> section so we can make your experience <strong>smoother</strong>
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
                {count === 1 ? 'Order' : 'Orders'} with <strong>{status}</strong> status, check in <strong>Profile, Orders</strong>
            </Typography>
        </div>
    )
}

const RegularUser = ({ orders, user }) => {

    const fillAccountInfoText = user => {
        const nodes = [];

        if (!user.firstName && !user.lastName && !user.deliveryAddress) {
            nodes.push(<AccountInfoText key={1} fields='First name, Last name and Delivery address' />);
        } else {
            if (!user.firstName && !user.lastName && user.deliveryAddress) {
                nodes.push(<AccountInfoText key={1} fields='First name and Last name' />);
            } else if (user.firstName && !user.lastName && !user.deliveryAddress) {
                nodes.push(<AccountInfoText key={1} fields='Last name and Delivery address' />);
            } else if (!user.firstName && user.lastName && !user.deliveryAddress) {
                nodes.push(<AccountInfoText key={1} fields='First name and Delivery address' />);
            } else {
                if (!user.firstName) {
                    nodes.push(<AccountInfoText key={1} fields='First name' />);
                }
                if (!user.lastName) {
                    nodes.push(<AccountInfoText key={1} fields='Last name' />);
                }
                if (!user.deliveryAddress) {
                    nodes.push(<AccountInfoText key={1} fields='Delivery address' />);
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
        <div>
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

const mapDispatchToPorps = {}

export default connect(mapStateToProps, mapDispatchToPorps)(RegularUser);
