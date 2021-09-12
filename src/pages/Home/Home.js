import React from 'react';
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import HomeGuest from "./Guest";
import { roles } from "global/roles";
import HomeRegularUser from "./RegularUser";
import HomeRestaurantOwner from "./RestaurantOwner";

import './Home.scss';

const Home = ({ user }) => {
    const getHomePageView = role => {
        switch (role) {
            case roles.regularUser: return <HomeRegularUser />
            case roles.restaurantOwner: return <HomeRestaurantOwner />
            default: return <HomeGuest />
        }
    }

    return (
        <div className='home-container'>
            <Typography
                className='special welcome-text'
                align='center'
                variant='h4'
            >
                Welcome to Food Delivery!
            </Typography>
            {getHomePageView(user.role)}
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Home);
