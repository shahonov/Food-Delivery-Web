import { useEffect } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Slide } from "react-reveal";

import MenuInfoForm from "./Form";
import {
    addRestaurantOwnerMeal,
    getRestaurantOwnerMeals,
    deleteRestaurantOwnerMeal
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
                mealType: '',
                netWeight: '',
                price: '',
                meals
            }}
            validate={values => {
                return {
                    ...validateInputsLengths(values, ['mealName'], 3, 30),
                    ...validateUnsplashUrls(values, ['unsplashPhotoUrl']),
                    ...validateNumberInputs(values, ['netWeight', 'price']),
                    ...validateNonEmptyInputs(values, ['netWeight', 'price', 'mealType'])
                };
            }}
            onSubmit={values => {
                const { meals, ...rest } = values;
                const mealInfo = {
                    ...rest,
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
    addRestaurantOwnerMeal,
    getRestaurantOwnerMeals,
    deleteRestaurantOwnerMeal
};

export default connect(mapStateToProps, mapDispatchToPorps)(MenuInfo);
