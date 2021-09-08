import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
    Card,
    Link,
    Dialog,
    Button,
    TextField,
    IconButton,
    Typography,
    CardContent,
    DialogTitle,
} from '@material-ui/core';
import {
    Add,
    Remove,
    Visibility,
} from '@material-ui/icons';

import { roles } from 'global/roles';

import './RestaurantFood.scss';

const RestaurantFood = ({
    user,
    price,
    phantom,
    mealName,
    mealType,
    netWeight,
    restaurantId,
    addMealToCart,
    restaurantName,
    unsplashPhotoUrl
}) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleIncreaseQty = () => setQuantity(prevState => prevState === 999 ? prevState : prevState + 1);
    const handleDecreaseQty = () => setQuantity(prevState => prevState === 0 ? prevState : prevState - 1);
    const handleChangeQty = ev => {
        if (!isNaN(ev.target.value) && +ev.target.value < 1000) {
            setQuantity(ev.target.value);
        }
    };

    const handleAddMealToCart = () => {
        addMealToCart({
            _id: uuid(),
            price,
            mealName,
            mealType,
            quantity,
            netWeight,
            restaurantId,
            restaurantName,
            unsplashPhotoUrl,
        });
        setQuantity(0);
    }

    return (
        <Card elevation={phantom ? 0 : 10} className='meal-card'>
            {
                !phantom &&
                <>
                    <div className='card-header'>
                        <div className='image-wrapper'>
                            <img src={unsplashPhotoUrl} alt={`${mealName}`} />
                        </div>
                        <div className='title-and-type'>
                            <div className='content'>
                                <Typography variant='h6' className='name syncopate'>
                                    {mealName}
                                </Typography>
                                <Typography variant='body2' className='meal-type syncopate'>
                                    {mealType} - {netWeight} gr.
                                </Typography>
                            </div>
                        </div>
                        <div className='icons-wrapper'>
                            <IconButton
                                onClick={handleDialogOpen}
                                className='view-image-icon-btn'
                            >
                                <Visibility />
                            </IconButton>
                        </div>
                    </div>
                    <CardContent className='card-content'>
                        <div className='price-and-image'>
                            <div className='price-wrapper'>
                                <Typography className='indie' variant='h5'>
                                    Piece/Portion: <span className='price'>$ {price}</span>
                                </Typography>
                                {
                                    user.role === roles.regularUser &&
                                    <Typography className='indie' variant='h5'>
                                        Total: <span className='total-price'>$ {price * quantity}</span>
                                    </Typography>
                                }
                            </div>
                        </div>
                    </CardContent>
                    {
                        user.role === roles.regularUser &&
                        <div className='order-wrapper'>
                            <div className='quantity-wrapper'>
                                <IconButton
                                    className='qty-icon'
                                    disabled={quantity === 0}
                                    onClick={handleDecreaseQty}
                                >
                                    <Remove />
                                </IconButton>
                                <TextField
                                    value={quantity}
                                    className='qty-input'
                                    onChange={handleChangeQty}
                                />
                                <IconButton onClick={handleIncreaseQty} className='qty-icon plus'>
                                    <Add />
                                </IconButton>
                            </div>
                            <Button
                                fullWidth
                                size='large'
                                color='primary'
                                variant='contained'
                                disabled={quantity === 0}
                                onClick={handleAddMealToCart}
                                className={`order-button ${quantity > 0 ? 'active' : ''}`}
                            >
                                Add to cart
                            </Button>
                        </div>
                    }
                </>
            }
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby='meal-photo-dialog'
            >
                <DialogTitle>
                    <Link underline='none' href={unsplashPhotoUrl} color='default' target='_blank'>
                        <Typography align='center' variant='h6' className='special'>
                            {unsplashPhotoUrl}
                        </Typography>
                    </Link>
                </DialogTitle>
                <img alt={`meal-${mealName}`} src={unsplashPhotoUrl} />
            </Dialog>
        </Card>
    )
}

export default RestaurantFood;
