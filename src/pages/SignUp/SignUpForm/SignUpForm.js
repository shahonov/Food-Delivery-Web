import React, { useEffect } from 'react';
import {
    Card,
    Select,
    Button,
    MenuItem,
    TextField,
    InputLabel,
    Typography,
    CardActions,
    CardContent,
    FormControl
} from '@material-ui/core';

import { roles } from 'global/roles';

import './SignUpForm.scss';

const SignUpForm = ({
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched
}) => {
    const listenToEnter = ev => {
        if (ev.key === 'Enter') {
            handleSubmit();
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', listenToEnter);
        return () => window.removeEventListener('keyup', listenToEnter);
        // eslint-disable-next-line
    }, []);

    return (
        <form>
            <Card elevation={10} className='sign-up-form-card'>
                <Typography variant='h5' className='card-header'>Register</Typography>
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
                    <div className='form-input'>
                        <TextField
                            fullWidth
                            margin='dense'
                            name='password'
                            type='password'
                            label='Password'
                            variant='outlined'
                            className='special'
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                        />
                        {
                            errors.password && touched.password &&
                            <div name='password' className='invalid-form-input'>{errors.password}</div>
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
                            name='confirmPassword'
                            onChange={handleChange}
                            label='Confirm password'
                            value={values.confirmPassword}
                        />
                        {
                            errors.confirmPassword && touched.confirmPassword &&
                            <div name='confirmPassword' className='invalid-form-input'>{errors.confirmPassword}</div>
                        }
                    </div>
                    <div className='form-input'>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel id='select-outlined'>User type</InputLabel>
                            <Select
                                id='demo-simple-select-outlined'
                                labelId='select-outlined'
                                value={values.userRole}
                                onChange={handleChange}
                                label='User type'
                                name='userRole'
                            >
                                <MenuItem value={roles.regularUser}>Regular user</MenuItem>
                                <MenuItem value={roles.restaurantOwner}>Restaurant Owner</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            errors.confirmPassword && touched.confirmPassword &&
                            <div name='confirmPassword' className='invalid-form-input'>{errors.confirmPassword}</div>
                        }
                    </div>
                    <div>
                        <span>Already have an account?</span>
                        {' '}
                        <a href='/sign-in'>Sign in</a>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={handleSubmit}
                    >
                        Sign up
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default SignUpForm;
