import { useHistory } from "react-router-dom";
import {
    Card,
    Button,
    IconButton,
    Typography,
    CardContent,
} from "@material-ui/core";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { Favorite, FavoriteBorderOutlined, LocationOnOutlined } from '@material-ui/icons';

import './Restaurant.scss';

const Restaurant = ({
    _id,
    user,
    phone,
    slogan,
    phantom,
    address,
    isFavorite,
    kitchenType,
    restaurantName,
    addToFavorites,
    removeFromFavorites,
    freeDeliveryThreshold
}) => {
    const history = useHistory();

    const routeToSignIn = () => history.push('/sign-in');
    const routeToRestaurantFoods = () => history.push(`/foods/${restaurantName}/${_id}`);
    const handleAddToFavorites = () => {
        const isInFavorites = user.favoriteRestaurants.find(x => x._id === _id);
        if (!isInFavorites) {
            addToFavorites(
                user._id,
                {
                    _id,
                    slogan,
                    address,
                    kitchenType,
                    restaurantName,
                    freeDeliveryThreshold
                }
            )
        } else {
            removeFromFavorites(user._id, _id);
        }
    }

    return (
        <Card elevation={phantom ? 0 : 10} className='restaurant-card'>
            {
                !phantom &&
                <>
                    <div className='card-header'>
                        <div className='title-and-kitchen'>
                            <RestaurantIcon fontSize='large' />
                            <div className='content'>
                                <Typography variant='h6' className='name syncopate'>
                                    {restaurantName}
                                </Typography>
                                <Typography variant='body2' className='kitchen-type syncopate'>
                                    {kitchenType}
                                </Typography>
                                <Typography variant='body2' className='syncopate'>
                                    {phone}
                                </Typography>
                            </div>
                        </div>
                        <div className='fav-wrapper'>
                            <IconButton className='fav-icon' onClick={handleAddToFavorites}>
                                {
                                    isFavorite
                                        ?
                                        <Favorite />
                                        :
                                        <FavoriteBorderOutlined />
                                }
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
                    {
                        user._id
                            ?
                            <Button
                                fullWidth
                                color='primary'
                                variant='contained'
                                onClick={routeToRestaurantFoods}
                            >
                                View meals
                            </Button>
                            :
                            <Button
                                fullWidth
                                color='primary'
                                variant='contained'
                                onClick={routeToSignIn}
                            >
                                Sign in to view meals
                            </Button>
                    }
                </>
            }
        </Card>
    )
}

export default Restaurant;
