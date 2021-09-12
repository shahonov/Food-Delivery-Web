import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
    AppBar,
    Button,
    Toolbar,
    Typography,
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import { roles } from 'global/roles';
import { signOut } from 'data/actions/userActions';

import './NavigationBar.scss';

const NavigationBar = ({ user, signOut }) => {
    const history = useHistory();

    const routeToHomePage = () => history.push('/');
    const routeToRestaurantsPage = () => history.push('/restaurants');
    const routeToSignInPage = () => history.push('/sign-in');
    const routeToSignUpPage = () => history.push('/sign-up');
    const routeToProfilePage = () => history.push('/profile');
    const routeToCartPage = () => history.push('/cart');
    const routeToOrdersPage = () => history.push('/orders');

    const handleSignOut = async () => {
        await signOut(user._id);
        history.push('/');
    }

    return (
        <AppBar position='fixed' color='secondary'>
            <Toolbar className='nav-bar'>
                <div className='logo-wrapper'>
                    <span className='home-btn' onClick={routeToHomePage}>
                        <FastfoodIcon />
                        <Typography className='syncopate logo-text' variant='h6'>Food Delivery</Typography>
                    </span>
                </div>
                <div className='main-nav-group'>
                    <Button
                        onClick={routeToRestaurantsPage}
                        className='nav-bar-item'
                        variant='contained'
                        color='primary'
                    >
                        Restaurants
                    </Button>
                </div>
                <div className='right-nav-group'>
                    {
                        user._id
                            ?
                            <>
                                {
                                    user.role === roles.regularUser
                                        ?
                                        <Button
                                            onClick={routeToCartPage}
                                            className='nav-bar-item'
                                            variant='contained'
                                            color='primary'
                                        >
                                            Cart
                                        </Button>
                                        :
                                        <Button
                                            onClick={routeToOrdersPage}
                                            className='nav-bar-item'
                                            variant='contained'
                                            color='primary'
                                        >
                                            Orders
                                        </Button>
                                }
                                <Button
                                    onClick={routeToProfilePage}
                                    className='nav-bar-item'
                                    variant='contained'
                                    color='primary'
                                >
                                    Profile
                                </Button>
                                <Button
                                    className='nav-bar-item'
                                    onClick={handleSignOut}
                                    variant='contained'
                                    color='primary'
                                >
                                    Log out
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    onClick={routeToSignInPage}
                                    className='nav-bar-item'
                                    variant='contained'
                                    color='primary'
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={routeToSignUpPage}
                                    className='nav-bar-item'
                                    variant='contained'
                                    color='primary'
                                >
                                    Register
                                </Button>
                            </>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToPorps = { signOut };

export default connect(mapStateToProps, mapDispatchToPorps)(NavigationBar);
