import { useState } from "react";
import {
    Tab,
    Tabs,
    AppBar,
    Typography
} from "@material-ui/core";
import { Slide } from "react-reveal";

import MenuInfo from "./Tabs/MenuInfo";
import UsersInfo from "./Tabs/UsersInfo";
import GeneralInfo from "./Tabs/GeneralInfo";
import DeliveryInfo from "./Tabs/DeliveryInfo";
import FavoritesInfo from "./Tabs/FavoritesInfo";
import { removeRestaurantFromFavorites } from "data/actions/userActions";
import { connect } from "react-redux";

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

const RestaurantOwner = ({ user, removeRestaurantFromFavorites }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div>
            <Slide top duration={300}>
                <AppBar position='static' color='primary'>
                    <Tabs value={value} onChange={handleChange} aria-label='owner-profile-tabs'>
                        <Tab label={<Typography className='syncopate'>General</Typography>} />
                        <Tab label={<Typography className='syncopate'>Delivery</Typography>} />
                        <Tab label={<Typography className='syncopate'>Menu</Typography>} />
                        <Tab label={<Typography className='syncopate'>Users</Typography>} />
                        <Tab label={<Typography className='syncopate'>Favorites</Typography>} />
                    </Tabs>
                </AppBar>
            </Slide>
            <TabPanel value={value} index={0}>
                <GeneralInfo user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DeliveryInfo user={user} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MenuInfo />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <UsersInfo />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <FavoritesInfo user={user} removeFromFavorites={removeRestaurantFromFavorites} />
            </TabPanel>
        </div>
    )
}

const mapDispatchToProps = { removeRestaurantFromFavorites };

export default connect(null, mapDispatchToProps)(RestaurantOwner);
