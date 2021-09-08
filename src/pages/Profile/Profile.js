import { useEffect } from "react";
import { connect } from "react-redux";

import { roles } from "global/roles";
import RegularUser from "./RegularUser";
import RestaurantOwner from "./RestaurantOwner";
import { getRestaurantOwnerMeals } from "data/actions/mealsActions";

const Profile = ({ user }) => {
    useEffect(() => {
        if (user.role === roles.restaurantOwner) {
            getRestaurantOwnerMeals(user._id);
        }
    }, [user.role, user._id]);

    return (
        user.role === roles.regularUser
            ?
            <RegularUser user={user} />
            :
            <RestaurantOwner user={user} />
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = { getRestaurantOwnerMeals };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
