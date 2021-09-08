import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Slide } from "react-reveal";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";

import OrderCard from "./Card";
import { orderStatuses } from "constants/orderStatuses/orderStatuses";
import { editOrderStatus, getRestaurantOwnerOrders } from "data/actions/ordersActions";

import './Orders.scss';

const Orders = ({
    user,
    orders,
    editOrderStatus,
    getRestaurantOwnerOrders
}) => {
    const [orderStatusFilter, setOrderStatusFilter] = useState('');

    const handleOrderStatusFilterChange = ev => setOrderStatusFilter(ev.target.value);

    useEffect(() => {
        getRestaurantOwnerOrders(user._id);
    }, [getRestaurantOwnerOrders, user]);

    const handleCancelOrder = orderId => editOrderStatus(orderId, orderStatuses.canceled);
    const handleProcessingOrder = orderId => editOrderStatus(orderId, orderStatuses.processing);
    const handleDeliveringOrder = orderId => editOrderStatus(orderId, orderStatuses.inRoute);
    const handleDeliveredOrder = orderId => editOrderStatus(orderId, orderStatuses.delivered);

    const existingOrderStatuses = orders.map(x => x.status);
    if (orderStatusFilter) {
        orders = orders.filter(x => x.status === orderStatusFilter);
    }

    return (
        <div className='orders-container'>
            <Slide top duration={300}>
                <div>
                    <Typography className='syncopate' align='center' variant='h5'>Orders</Typography>
                    {
                        orders.length === 0
                            ?
                            <Typography className='syncopate' align='center' variant='h6'>No orders found</Typography>
                            :
                            <div className='filters-wrapper'>
                                <FormControl margin='dense' fullWidth variant='outlined'>
                                    <InputLabel id='order-status-select-label'>Filter by order status</InputLabel>
                                    <Select
                                        onChange={handleOrderStatusFilterChange}
                                        labelId='order-status-select-label'
                                        label='Filter by order status'
                                        value={orderStatusFilter}
                                        id='order-status-select'
                                    >
                                        <MenuItem value=''>All</MenuItem>
                                        {
                                            existingOrderStatuses.map((x, i) => {
                                                return <MenuItem key={i} value={x}>{x}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                    }
                </div>
            </Slide>
            <Slide bottom duration={300}>
                <div>
                    {
                        orders.sort((a, b) => b.orderTime - a.orderTime)?.map((order, i) => {
                            return (
                                <OrderCard
                                    key={i}
                                    {...order}
                                    onCancelOrder={handleCancelOrder}
                                    onDeliveredOrder={handleDeliveredOrder}
                                    onProcessingOrder={handleProcessingOrder}
                                    onDeliveringOrder={handleDeliveringOrder}
                                />
                            )
                        })
                    }
                </div>
            </Slide>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    orders: state.orders.all
})

const mapDispatchToPorps = { getRestaurantOwnerOrders, editOrderStatus }

export default connect(mapStateToProps, mapDispatchToPorps)(Orders);
