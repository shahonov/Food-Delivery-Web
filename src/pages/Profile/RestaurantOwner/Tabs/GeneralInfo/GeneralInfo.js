import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';

import GeneralInfoForm from "./Form";
import { updateRestaurantOwnerProfile } from "data/actions/userActions";
import { validateInputsLengths } from "global/formikValidations/formikValidations";

const GeneralInfo = ({ user, updateRestaurantOwnerProfile }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={{
                restaurantName: user.restaurantName || '',
                kitchenType: user.kitchenType || '',
                slogan: user.slogan || ''
            }}
            validate={values => {
                return {
                    ...validateInputsLengths(values, ['restaurantName'], 3, 30),
                    ...validateInputsLengths(values, ['slogan'], 5, 50)
                };
            }}
            onSubmit={values => updateRestaurantOwnerProfile({ _id: user._id, ...values })}
        >
            {
                props => (
                    <Slide bottom duration={300}>
                        <GeneralInfoForm {...props} />
                    </Slide>
                )
            }
        </Formik>
    )
}

const mapDispatchToProps = { updateRestaurantOwnerProfile };

export default connect(null, mapDispatchToProps)(GeneralInfo);
