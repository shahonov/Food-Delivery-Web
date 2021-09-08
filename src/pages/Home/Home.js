/* istanbul ignore file */

import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import Guest from "./Guest";
import { roles } from "global/roles";
import RegularUser from "./RegularUser";
import RestaurantOwner from "./RestaurantOwner";

import './Home.scss';

const Home = ({ user }) => {
    const getHomePageView = role => {
        switch (role) {
            case roles.regularUser: return <RegularUser />
            case roles.restaurantOwner: return <RestaurantOwner />
            default: return <Guest />
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
