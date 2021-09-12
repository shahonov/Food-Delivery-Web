import React from 'react';
import {
    Card,
    Button,
    TextField,
    Typography
} from "@material-ui/core";

import './DeliveryInfoForm.scss';

const DeliveryInfoForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    initialValues
}) => {
    return (
        <form onSubmit={handleSubmit} className='delivery-info-form'>
            <Card elevation={10} className='delivery-info-form-card'>
                <Typography variant='h5' className='card-header syncopate'>Delivery info</Typography>
                <div className='form-input'>
                    <TextField
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        label='Address'
                        margin='dense'
                        name='address'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.address && touched.address &&
                        <div name='address' className='invalid-form-input'>{errors.address}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        onChange={handleChange}
                        value={values.phone}
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        margin='dense'
                        label='Phone'
                        name='phone'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.phone && touched.phone &&
                        <div name='phone' className='invalid-form-input'>{errors.phone}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        value={values.freeDeliveryThreshold}
                        label='Free delivery threshold'
                        name='freeDeliveryThreshold'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.freeDeliveryThreshold && touched.freeDeliveryThreshold &&
                        <div name='freeDeliveryThreshold' className='invalid-form-input'>{errors.freeDeliveryThreshold}</div>
                    }
                </div>
                {
                    JSON.stringify(values) !== JSON.stringify(initialValues) &&
                    <Button
                        onClick={handleSubmit}
                        className='save-btn'
                        variant='contained'
                        color='primary'
                        type='submit'
                        fullWidth
                    >
                        Save changes
                    </Button>
                }
            </Card>
        </form>
    )
}

export default DeliveryInfoForm;
