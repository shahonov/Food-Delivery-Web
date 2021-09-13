import React, { useState } from "react";
import {
    Card,
    Link,
    Table,
    Button,
    Dialog,
    Tooltip,
    TableRow,
    TextField,
    TableHead,
    TableCell,
    TableBody,
    Typography,
    IconButton,
    DialogTitle,
    TableContainer,
} from "@material-ui/core";
import {
    ArrowUpward,
    ArrowDownward,
    AddBoxOutlined,
    DeleteForeverOutlined
} from '@material-ui/icons';

import './MenuInfoForm.scss';

const MenuInfoForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    changeMealOrder,
    handleDeleteMeal
}) => {
    const [open, setOpen] = useState(false);
    const [photoSrc, setPhotoSrc] = useState('');

    const handleOpenDialog = (src) => {
        setOpen(true);
        setPhotoSrc(src);
    }
    const handleDialogClose = () => {
        setOpen(false);
        setPhotoSrc('');
    }

    const handleIncreaseOrderNumber = meal => changeMealOrder(meal._id, meal.orderId, meal.orderId + 1);
    const handleDecreaseOrderNumber = meal => changeMealOrder(meal._id, meal.orderId, meal.orderId - 1);

    const orderedMeals = values.meals.sort((a, b) => a.orderId - b.orderId);

    return (
        <form onSubmit={handleSubmit} className='menu-info-form'>
            <Card elevation={10} className='menu-info-form-card'>
                <Typography variant='h5' className='card-header syncopate'>Menu info</Typography>
                <TableContainer>
                    <Table aria-label='menu info table' className='menu-info-form-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell className='table-body-cell'>
                                    <Typography variant='h5' className='special'>Order</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Meal name</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Unsplash photo url</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Description</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Net weight</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Price</Typography>
                                </TableCell>
                                <TableCell className='table-head-cell'>
                                    <Typography variant='h5' className='special'>Actions</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell className='table-body-cell'></TableCell>
                                <TableCell className='table-body-cell'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        name='mealName'
                                        label='Meal name'
                                        variant='outlined'
                                        className='special'
                                        onBlur={handleBlur}
                                        value={values.mealName}
                                        onChange={handleChange}
                                    />
                                    {
                                        errors.mealName && touched.mealName &&
                                        <div name='mealName' className='invalid-form-input'>{errors.mealName}</div>
                                    }
                                </TableCell>
                                <TableCell className='table-body-cell'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        variant='outlined'
                                        className='special'
                                        onBlur={handleBlur}
                                        name='unsplashPhotoUrl'
                                        onChange={handleChange}
                                        label='Unsplash photo url'
                                        value={values.unsplashPhotoUrl}
                                    />
                                    {
                                        errors.unsplashPhotoUrl && touched.unsplashPhotoUrl &&
                                        <div name='unsplashPhotoUrl' className='invalid-form-input'>{errors.unsplashPhotoUrl}</div>
                                    }
                                </TableCell>
                                <TableCell className='table-body-cell'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        variant='outlined'
                                        name='description'
                                        label='Description'
                                        className='special'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                    />
                                    {
                                        errors.description && touched.description &&
                                        <div name='description' className='invalid-form-input'>{errors.description}</div>
                                    }
                                </TableCell>
                                <TableCell className='table-body-cell'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        name='netWeight'
                                        label='Net weight'
                                        variant='outlined'
                                        className='special'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.netWeight}
                                    />
                                    {
                                        errors.netWeight && touched.netWeight &&
                                        <div name='netWeight' className='invalid-form-input'>{errors.netWeight}</div>
                                    }
                                </TableCell>
                                <TableCell className='table-body-cell'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        name='price'
                                        label='Price'
                                        variant='outlined'
                                        className='special'
                                        onBlur={handleBlur}
                                        value={values.price}
                                        onChange={handleChange}
                                    />
                                    {
                                        errors.price && touched.price &&
                                        <div name='price' className='invalid-form-input'>{errors.price}</div>
                                    }
                                </TableCell>
                                <TableCell className='table-body-cell'>
                                    <Button
                                        className='add-btn'
                                        variant='contained'
                                        onClick={handleSubmit}
                                        startIcon={<AddBoxOutlined />}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {orderedMeals.map(meal => (
                                <TableRow hover key={meal._id}>
                                    <TableCell className='table-body-cell'>
                                        <div className='order-icons'>
                                            <IconButton
                                                className='arrow-up'
                                                onClick={() => handleDecreaseOrderNumber(meal)}
                                            >
                                                <ArrowUpward />
                                            </IconButton>
                                            <IconButton
                                                className='arrow-down'
                                                onClick={() => handleIncreaseOrderNumber(meal)}
                                            >
                                                <ArrowDownward />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Typography className='special'>{meal.mealName}</Typography>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Typography className='special'>
                                            <Tooltip title={meal.unsplashPhotoUrl}>
                                                <Button
                                                    color='default'
                                                    variant='outlined'
                                                    onClick={() => handleOpenDialog(meal.unsplashPhotoUrl)}
                                                >
                                                    Click here to preview
                                                </Button>
                                            </Tooltip>
                                        </Typography>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Typography className='special'>{meal.description}</Typography>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Typography className='special'>{meal.netWeight}</Typography>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Typography className='special'>{meal.price}</Typography>
                                    </TableCell>
                                    <TableCell className='table-body-cell'>
                                        <Button
                                            variant='contained'
                                            className='remove-btn'
                                            startIcon={<DeleteForeverOutlined />}
                                            onClick={() => handleDeleteMeal(meal._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby='meal-photo-dialog'
            >
                <DialogTitle>
                    <Link underline='none' href={photoSrc} color='default' target='_blank'>
                        <Typography align='center' variant='h6' className='special'>
                            {photoSrc}
                        </Typography>
                    </Link>
                </DialogTitle>
                <img alt={`meal`} src={photoSrc} />
            </Dialog>
        </form >
    )
}

export default MenuInfoForm;
