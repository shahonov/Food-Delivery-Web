import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    Button,
    Dialog,
    Typography,
    DialogContent,
} from '@material-ui/core';
import {
    DoneOutlined,
    BlockOutlined,
    CachedOutlined,
    DoneAllOutlined,
    ListAltOutlined,
    LocalShippingOutlined,
} from '@material-ui/icons';

import CardMealsTable from './Table';
import { orderStatuses } from 'constants/orderStatuses/orderStatuses';

import './OrderInfoCard.scss';

const OrderInfoCard = ({
    _id,
    meals,
    status,
    orderTime,
    restaurantId,
    onCancelOrder,
    restaurantName,
    statusChangelog,
    onReceivedOrder,
}) => {
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    const routeToRestaurantPage = () => history.push(`/foods/${restaurantName}/${restaurantId}`);

    const formatTime = dt => {
        const dateObj = new Date(dt);
        const date = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const dateValue = date.toString().length === 1 ? `0${date}` : date;
        const monthValue = month.toString().length === 1 ? `0${month}` : month;
        const hoursValue = hours.toString().length === 1 ? `0${hours}` : hours;
        const minutesValue = minutes.toString().length === 1 ? `0${minutes}` : minutes;
        return `${dateValue}.${monthValue}.${year} - ${hoursValue}:${minutesValue}`
    }

    let totalOrderPrice = 0;
    for (const meal of meals) {
        totalOrderPrice += +meal.price * +meal.quantity;
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case orderStatuses.placed: return <ListAltOutlined fontSize='large' />
            case orderStatuses.canceled: return <BlockOutlined fontSize='large' />
            case orderStatuses.processing: return <CachedOutlined fontSize='large' />
            case orderStatuses.inRoute: return <LocalShippingOutlined fontSize='large' />
            case orderStatuses.delivered: return <DoneOutlined fontSize='large' />
            case orderStatuses.received: return <DoneAllOutlined fontSize='large' />
            default: return false;
        }
    }

    const getStatusChangeButton = (status) => {
        switch (status) {
            case orderStatuses.placed: return (
                <div className='buttons-wrapper'>
                    <Button
                        fullWidth
                        size='large'
                        color='primary'
                        variant='contained'
                        className='second-btn'
                        onClick={() => onCancelOrder(_id)}
                    >
                        Cancel
                    </Button>
                </div>
            );
            case orderStatuses.canceled: return false;
            case orderStatuses.processing: return false;
            case orderStatuses.inRoute: return false;
            case orderStatuses.delivered: return (
                <div className='buttons-wrapper'>
                    <Button
                        fullWidth
                        size='large'
                        color='primary'
                        variant='contained'
                        className='second-btn'
                        onClick={() => onReceivedOrder(_id)}
                    >
                        Mark as received
                    </Button>
                </div>
            );
            case orderStatuses.received: return false;
            default: return false;
        }
    }

    const statusClass = status === orderStatuses.inRoute ? orderStatuses.inRoute : orderStatuses[status]

    return (
        <Card elevation={10} className={`order-info-card ${statusClass}`}>
            <div className='order-info-labels'>
                <Typography className='special label-wrapper'>
                    Order from:
                    <strong
                        className='restaurant-name'
                        onClick={routeToRestaurantPage}
                    >
                        {restaurantName}
                    </strong>
                </Typography>
                <Typography className='special label-wrapper'>
                    Current status:
                    <strong
                        className='status-changelog'
                        onClick={handleOpenDialog}
                    >
                        {status}
                    </strong>
                    {getStatusIcon(status)}
                </Typography>
                <Typography className='special label-wrapper'>
                    Ordered at: <strong>{formatTime(orderTime)}</strong>
                </Typography>
                <Typography className='special label-wrapper'>
                    Total price: <strong>${' '}{totalOrderPrice}</strong>
                </Typography>
            </div>
            <CardMealsTable meals={meals} />
            {getStatusChangeButton(status)}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby='status-info-dialog'
            >
                <div>
                    <br />
                    <br />
                    <Typography align='center' variant='h6' className='syncopate'>
                        Status Changelog
                    </Typography>
                </div>
                <DialogContent>
                    <br />
                    <Typography align='center' variant='body1' className='special'>
                        {orderStatuses.placed} at: <strong>{formatTime(orderTime)}</strong>
                    </Typography>
                    {
                        statusChangelog?.map((change, i) => {
                            return (
                                <Typography key={i} align='center' variant='body1' className='special'>
                                    {change.toStatus} at: <strong>{formatTime(change.when)}</strong>
                                </Typography>
                            )
                        })
                    }
                    <br />
                    <br />
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default OrderInfoCard;
