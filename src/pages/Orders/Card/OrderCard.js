/*istanbul ignore file */

import { useState } from 'react';
import {
    Card,
    Button,
    Dialog,
    Typography,
    DialogContent
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

import './OrderCard.scss';

const OrderCard = ({
    _id,
    meals,
    status,
    orderTime,
    clientName,
    clientPhone,
    onCancelOrder,
    statusChangelog,
    onDeliveredOrder,
    onDeliveringOrder,
    onProcessingOrder,
    clientDeliveryAddress,
}) => {
    const [clientInfoDialogOpen, setClientInfoDialogOpen] = useState(false);
    const [statusChangelogDialogOpen, setStatusChangelogDialogOpen] = useState(false);

    const handleOpenClientDialog = () => setClientInfoDialogOpen(true);
    const handleCloseClientDialog = () => setClientInfoDialogOpen(false);

    const handleOpenStatusDialog = () => setStatusChangelogDialogOpen(true);
    const handleCloseStatusDialog = () => setStatusChangelogDialogOpen(false);

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
                        size='large'
                        color='primary'
                        variant='contained'
                        className='first-btn'
                        onClick={() => onProcessingOrder(_id)}
                    >
                        Processing
                    </Button>
                    <Button
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
            case orderStatuses.processing: return (
                <div className='buttons-wrapper'>
                    <Button
                        fullWidth
                        size='large'
                        color='primary'
                        variant='contained'
                        onClick={() => onDeliveringOrder(_id)}
                    >
                        Delivering
                    </Button>
                </div>
            );
            case orderStatuses.inRoute: return (
                <div className='buttons-wrapper'>
                    <Button
                        fullWidth
                        size='large'
                        color='primary'
                        variant='contained'
                        onClick={() => onDeliveredOrder(_id)}
                    >
                        Delivered
                    </Button>
                </div>
            );
            case orderStatuses.delivered: return false;
            case orderStatuses.received: return false;
            default: return false;
        }
    }

    const statusClass = status === orderStatuses.inRoute ? orderStatuses.inRoute : orderStatuses[status]

    return (
        <Card elevation={10} className={`order-card ${statusClass}`}>
            <div className='order-labels'>
                <Typography className='special label-wrapper'>
                    Order from:
                    <strong
                        className='client-name'
                        onClick={handleOpenClientDialog}
                    >
                        {clientName}
                    </strong>
                </Typography>
                <Typography className='special label-wrapper'>
                    Current status:
                    <strong
                        className='status-label'
                        onClick={handleOpenStatusDialog}
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
                open={clientInfoDialogOpen}
                onClose={handleCloseClientDialog}
                aria-labelledby='client-info-dialog'
            >
                <div>
                    <br />
                    <br />
                    <Typography align='center' variant='h6' className='syncopate'>
                        Client Info
                    </Typography>
                </div>
                <DialogContent>
                    <br />
                    <Typography align='center' variant='body1' className='special'>
                        Client name: <strong>{clientName}</strong>
                    </Typography>
                    <Typography align='center' variant='body1' className='special'>
                        Delivery address: <strong>{clientDeliveryAddress}</strong>
                    </Typography>
                    <Typography align='center' variant='body1' className='special'>
                        Client phone: <strong>{clientPhone}</strong>
                    </Typography>
                    <br />
                    <br />
                </DialogContent>
            </Dialog>
            <Dialog
                open={statusChangelogDialogOpen}
                onClose={handleCloseStatusDialog}
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

export default OrderCard;
