import { useHistory } from "react-router-dom";
import {
    Card,
    Button,
    Typography,
    CardContent,
} from "@material-ui/core";

import OrderMealsTable from "./Table";
import { orderStatuses } from "constants/orderStatuses/orderStatuses";

import './RestaurantOrderCard.scss';

const RestaurantOrderCard = ({
    name,
    user,
    onCreateOrder,
    restaurantMeals,
    onRemoveFromCart,
}) => {
    const history = useHistory();

    const routeToProfilePage = () => history.push('/profile');


    const handleCreateOrder = () => {
        const { restaurantId } = restaurantMeals[0];
        const orderInfo = {
            restaurantId,
            clientId: user._id,
            restaurantName: name,
            orderTime: Date.now(),
            meals: restaurantMeals,
            clientPhone: user.phone,
            status: orderStatuses.placed,
            clientDeliveryAddress: user.deliveryAddress,
            clientName: `${user.firstName} ${user.lastName}`,
        }
        onCreateOrder(orderInfo);
    }

    const getButton = user => {
        if (
            !user.phone ||
            !user.lastName ||
            !user.firstName ||
            !user.deliveryAddress
        ) {
            return (
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    onClick={routeToProfilePage}
                >
                    Fill in your Profile Information so you can place an order
                </Button>
            )
        } else {
            return (
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    onClick={handleCreateOrder}
                >
                    Place Order For<span className='restaurant-btn-name bold'>{name}</span>
                </Button>
            )
        }
    }

    return (
        <Card elevation={10} className='restaurant-orders-card'>
            <Typography align='center' className='syncopate card-header' variant='h6'>{name}</Typography>
            <CardContent className='card-content'>
                <OrderMealsTable meals={restaurantMeals} onRemove={onRemoveFromCart} />
            </CardContent>
            {getButton(user)}
        </Card>
    )
}

export default RestaurantOrderCard;
