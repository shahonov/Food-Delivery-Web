import { useEffect } from "react";
import { connect } from "react-redux";
import { Slide } from "react-reveal";

import UsersInfoForm from "./Form";
import { getRestaurantOwnerOrders } from "data/actions/ordersActions";
import { orderStatuses } from "constants/orderStatuses/orderStatuses";
import { blockForRestaurant, unblockFromRestaurant } from "data/actions/userActions";

const UsersInfo = ({
    user,
    orders,
    blockForRestaurant,
    unblockFromRestaurant,
    getRestaurantOwnerOrders
}) => {

    useEffect(() => {
        getRestaurantOwnerOrders(user._id);
        // eslint-disable-next-line
    }, [user]);

    const getCustomersOrders = () => {
        const ordersByCustomer = {};
        orders.forEach(order => {
            const obj = {
                meals: order.meals,
                phone: order.clientPhone,
                fullName: order.clientName,
                deliveryAddress: order.clientDeliveryAddress,
            }
            if (order.status === orderStatuses.delivered || order.status === orderStatuses.received) {
                if (Object.keys(ordersByCustomer).includes(order.clientId)) {
                    ordersByCustomer[order.clientId].push(obj);
                } else {
                    ordersByCustomer[order.clientId] = [obj];
                }
            }
        });
        return ordersByCustomer;
    }

    const handleBlockCustomer = customerId => blockForRestaurant(user._id, customerId);
    const handleUnblockCustomer = customerId => unblockFromRestaurant(user._id, customerId);

    return (
        <Slide bottom duration={300}>
            <UsersInfoForm
                user={user}
                customers={getCustomersOrders()}
                onBlockCustomer={handleBlockCustomer}
                onUnblockCustomer={handleUnblockCustomer}
            />
        </Slide>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    orders: state.orders.all
})

const mapDispatchToPorps = {
    blockForRestaurant,
    unblockFromRestaurant,
    getRestaurantOwnerOrders
}

export default connect(mapStateToProps, mapDispatchToPorps)(UsersInfo);
