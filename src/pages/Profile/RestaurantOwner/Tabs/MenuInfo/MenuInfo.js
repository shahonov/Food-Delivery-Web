import React, { useEffect } from 'react';
import { Formik } from "formik";
import { Slide } from "react-reveal";
import { connect } from "react-redux";

import MenuInfoForm from "./Form";
import {
    changeMealOrder,
    addRestaurantOwnerMeal,
    getRestaurantOwnerMeals,
    deleteRestaurantOwnerMeal,
} from "data/actions/mealsActions";
import {
    validateNonEmptyInputs,
    validateInputsLengths,
    validateNumberInputs,
    validateUnsplashUrls
} from "global/formikValidations/formikValidations";

const MenuInfo = ({
    user,
    meals,
    changeMealOrder,
    addRestaurantOwnerMeal,
    getRestaurantOwnerMeals,
    deleteRestaurantOwnerMeal
}) => {

    useEffect(() => {
        getRestaurantOwnerMeals(user._id);
    }, [getRestaurantOwnerMeals, user._id]);

    const transformUnsplashPhotoUrlToSrc = url => {
        const lastSlash = url.lastIndexOf('/');
        const id = url.substr(lastSlash + 1);
        return `https://source.unsplash.com/${id}`;
    }

    const handleDeleteMeal = mealId => deleteRestaurantOwnerMeal(user._id, mealId);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                mealName: '',
                unsplashPhotoUrl: '',
                description: '',
                netWeight: '',
                price: '',
                meals
            }}
            validate={values => {
                return {
                    ...validateInputsLengths(values, ['mealName'], 3, 30),
                    ...validateUnsplashUrls(values, ['unsplashPhotoUrl']),
                    ...validateNumberInputs(values, ['netWeight', 'price']),
                    ...validateNonEmptyInputs(values, ['netWeight', 'price', 'description'])
                };
            }}
            onSubmit={values => {
                const { meals, ...rest } = values;
                const sorted = meals.sort((a, b) => b.orderId - a.orderId);
                const nextOrderId = sorted[0]?.orderId + 1 || 1;
                const mealInfo = {
                    ...rest,
                    orderId: nextOrderId,
                    unsplashPhotoUrl: transformUnsplashPhotoUrlToSrc(rest.unsplashPhotoUrl)
                };
                addRestaurantOwnerMeal(user._id, mealInfo);
            }}
        >
            {
                props => (
                    <Slide bottom duration={300}>
                        <MenuInfoForm
                            {...props}
                            changeMealOrder={changeMealOrder}
                            handleDeleteMeal={handleDeleteMeal}
                        />
                    </Slide>
                )
            }
        </Formik>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    meals: state.meals.all
});

const mapDispatchToPorps = {
    changeMealOrder,
    addRestaurantOwnerMeal,
    getRestaurantOwnerMeals,
    deleteRestaurantOwnerMeal
};

export default connect(mapStateToProps, mapDispatchToPorps)(MenuInfo);
