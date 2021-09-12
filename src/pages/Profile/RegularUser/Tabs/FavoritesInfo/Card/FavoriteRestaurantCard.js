import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Button,
    Card,
    Typography,
    IconButton,
    CardContent
} from "@material-ui/core";
import {
    Restaurant,
    HighlightOff,
    LocationOnOutlined
} from '@material-ui/icons';

import './FavoriteRestaurantCard.scss';

const FavoriteRestaurantCard = ({
    _id,
    slogan,
    address,
    phantom,
    kitchenType,
    restaurantName,
    removeFromFavorites,
    freeDeliveryThreshold,
}) => {
    const history = useHistory();

    const handleRemoveFromFavorites = () => removeFromFavorites(_id);
    const routeToRestaurantFoods = () => history.push(`/foods/${restaurantName}/${_id}`);

    return (
        <Card elevation={phantom ? 0 : 10} className='restaurant-card'>
            {
                !phantom &&
                <>
                    <div className='card-header'>
                        <div className='title-and-kitchen'>
                            <Restaurant fontSize='large' />
                            <div className='content'>
                                <Typography variant='h6' className='name syncopate'>
                                    {restaurantName}
                                </Typography>
                                <Typography variant='body2' className='kitchen-type syncopate'>
                                    {kitchenType}
                                </Typography>
                            </div>
                        </div>
                        <div className='fav-wrapper'>
                            <IconButton className='remove-icon' onClick={handleRemoveFromFavorites}>
                                <HighlightOff />
                            </IconButton>
                        </div>
                    </div>
                    <CardContent className='card-content'>
                        <div className='address'>
                            <LocationOnOutlined />
                            <Typography className='indie'>{address}</Typography>
                        </div>
                        <div className='slogan'>
                            <Typography className='indie'>{slogan}</Typography>
                        </div>
                        <div className='free-delivery-wrapper'>
                            <Typography className='indie'>
                                Free delivery over:
                                <span className='free-delivery'>{freeDeliveryThreshold}</span>
                            </Typography>
                        </div>
                    </CardContent>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={routeToRestaurantFoods}
                    >
                        View meals
                    </Button>
                </>
            }
        </Card>
    )
}

export default FavoriteRestaurantCard;
