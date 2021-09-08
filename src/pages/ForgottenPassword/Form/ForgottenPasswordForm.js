import React from 'react';
import {
    Card,
    Button,
    TextField,
    Typography,
    CardActions,
    CardContent
} from '@material-ui/core';

import './ForgottenPasswordForm.scss';

const ForgottenPasswordForm = ({
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched
}) => {
    return (
        <form>
            <Card elevation={10} className='forgotten-password-form-card'>
                <Typography variant='h5' className='card-header'>Forgotten password</Typography>
                <CardContent>
                    <div className='form-input'>
                        <TextField
                            fullWidth
                            name='email'
                            label='Email'
                            margin='dense'
                            variant='outlined'
                            className='special'
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                        />
                        {
                            errors.email && touched.email &&
                            <div name='email' className='invalid-form-input'>{errors.email}</div>
                        }
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={handleSubmit}
                    >
                        Send reset password email
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default ForgottenPasswordForm;
