import React from 'react';
import { Typography } from '@material-ui/core';

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

export default OrderInfoText;
