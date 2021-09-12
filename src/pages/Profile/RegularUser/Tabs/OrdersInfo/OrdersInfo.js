import React from 'react';
import { useEffect } from "react";
import { Slide } from "react-reveal";
import { connect } from "react-redux";

import OrderInfoCard from "./Card";
import { orderStatuses } from "constants/orderStatuses/orderStatuses";
import { editOrderStatus, getRegularUserOrders } from "data/actions/ordersActions";

const OrdersInfo = ({
    user,
    orders,
    editOrderStatus,
    getRegularUserOrders
}) => {

    useEffect(() => {
        getRegularUserOrders(user._id);
    }, [getRegularUserOrders, user]);

    const handleCancelOrder = orderId => editOrderStatus(orderId, orderStatuses.canceled);
    const handleReceivedOrder = orderId => editOrderStatus(orderId, orderStatuses.received);

    return (
        <Slide bottom duration={300}>
            <div>
                {
                    orders.sort((a, b) => b.orderTime - a.orderTime)?.map((order, i) => {
                        return (
                            <OrderInfoCard
                                key={i}
                                {...order}
                                onCancelOrder={handleCancelOrder}
                                onReceivedOrder={handleReceivedOrder}
                            />
                        )
                    })
                }
            </div>
        </Slide>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    orders: state.orders.all
})

const mapDispatchToPorps = { getRegularUserOrders, editOrderStatus }

export default connect(mapStateToProps, mapDispatchToPorps)(OrdersInfo);
