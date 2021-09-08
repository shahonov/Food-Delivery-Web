import React from 'react';
import {
    Card,
    Button,
    TextField,
    Typography,
    CardActions,
    CardContent
} from '@material-ui/core';

import './ResetPasswordForm.scss';

const ResetPasswordForm = ({
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched
}) => {
    return (
        <form>
            <Card elevation={10} className='reset-password-form-card'>
                <Typography variant='h5' className='card-header'>Reset password</Typography>
                <CardContent>
                    <div className='form-input'>
                        <TextField
                            fullWidth
                            margin='dense'
                            type='password'
                            variant='outlined'
                            name='newPassword'
                            className='special'
                            onBlur={handleBlur}
                            label='New Password'
                            onChange={handleChange}
                            value={values.newPassword}
                        />
                        {
                            errors.newPassword && touched.newPassword &&
                            <div name='newPassword' className='invalid-form-input'>{errors.newPassword}</div>
                        }
                    </div>
                    <div className='form-input'>
                        <TextField
                            fullWidth
                            margin='dense'
                            type='password'
                            variant='outlined'
                            className='special'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name='confirmNewPassword'
                            label='Confirm New Password'
                            value={values.confirmNewPassword}
                        />
                        {
                            errors.confirmNewPassword && touched.confirmNewPassword &&
                            <div name='confirmNewPassword' className='invalid-form-input'>{errors.confirmNewPassword}</div>
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
                        Reset password
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default ResetPasswordForm;
