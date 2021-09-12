import React, { useState } from 'react';
import { Slide } from "react-reveal";
import { connect } from "react-redux";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";

import OrdersInfo from "./Tabs/OrdersInfo";
import DeliveryInfo from "./Tabs/DeliveryInfo";
import FavoritesInfo from "./Tabs/FavoritesInfo";
import { removeRestaurantFromFavorites } from "data/actions/userActions";

const TabPanel = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && children}
        </div>
    );
}

const RegularUser = ({ user, removeRestaurantFromFavorites }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Slide top duration={300}>
                <AppBar position='static' color='primary'>
                    <Tabs value={value} onChange={handleChange} aria-label='owner-profile-tabs'>
                        <Tab label={<Typography className='syncopate'>Delivery</Typography>} />
                        <Tab label={<Typography className='syncopate'>Favorites</Typography>} />
                        <Tab label={<Typography className='syncopate'>Orders</Typography>} />
                    </Tabs>
                </AppBar>
            </Slide>
            <TabPanel value={value} index={0}>
                <DeliveryInfo user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FavoritesInfo user={user} removeFromFavorites={removeRestaurantFromFavorites} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrdersInfo user={user} />
            </TabPanel>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToPorps = { removeRestaurantFromFavorites };

export default connect(mapStateToProps, mapDispatchToPorps)(RegularUser);
