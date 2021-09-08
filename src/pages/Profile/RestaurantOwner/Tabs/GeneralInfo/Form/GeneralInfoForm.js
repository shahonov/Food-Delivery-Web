import {
    Card,
    Button,
    TextField,
    Typography
} from "@material-ui/core";

import './GeneralInfoForm.scss';

const GeneralInfoForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    initialValues
}) => {
    return (
        <form onSubmit={handleSubmit} className='general-info-form'>
            <Card elevation={10} className='general-info-form-card'>
                <Typography variant='h5' className='card-header syncopate'>General info</Typography>
                <div className='form-input'>
                    <TextField
                        value={values.restaurantName}
                        onChange={handleChange}
                        label='Restaurant name'
                        name='restaurantName'
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.restaurantName && touched.restaurantName &&
                        <div name='restaurantName' className='invalid-form-input'>{errors.restaurantName}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        onChange={handleChange}
                        value={values.slogan}
                        onBlur={handleBlur}
                        className='special'
                        variant='outlined'
                        margin='dense'
                        label='Slogan'
                        name='slogan'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.slogan && touched.slogan &&
                        <div name='slogan' className='invalid-form-input'>{errors.slogan}</div>
                    }
                </div>
                <div className='form-input'>
                    <TextField
                        value={values.kitchenType}
                        onChange={handleChange}
                        label='Kitchen type'
                        className='special'
                        onBlur={handleBlur}
                        variant='outlined'
                        name='kitchenType'
                        margin='dense'
                        size='small'
                        fullWidth
                    />
                    {
                        errors.kitchenType && touched.kitchenType &&
                        <div name='kitchenType' className='invalid-form-input'>{errors.kitchenType}</div>
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

export default GeneralInfoForm;
