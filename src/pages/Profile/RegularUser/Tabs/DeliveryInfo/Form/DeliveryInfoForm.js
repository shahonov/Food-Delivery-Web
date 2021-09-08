import {
    Card,
    Button,
    TextField,
    Typography
} from "@material-ui/core";

import './DeliveryInfoForm.scss';

const DeliveryInfoForm = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    initialValues
}) => {
    return (
        <form onSubmit={handleSubmit} className='regular-user-form'>
            <Card elevation={10} className='regular-user-form-card'>
                <Typography variant='h5' className='card-header syncopate'>Delivery info</Typography>
                <div className='form-input'>
                    <TextField
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='special'
                        label='First name'
                        variant='outlined'
                        name='firstName'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.firstName && touched.firstName &&
                        <div name='firstName' className='invalid-form-input'>{errors.firstName}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        label='Last name'
                        name='lastName'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.lastName && touched.lastName &&
                        <div name='lastName' className='invalid-form-input'>{errors.lastName}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        value={values.deliveryAddress}
                        onChange={handleChange}
                        label='Delivery address'
                        name='deliveryAddress'
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.deliveryAddress && touched.deliveryAddress &&
                        <div name='deliveryAddress' className='invalid-form-input'>{errors.deliveryAddress}</div>
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
