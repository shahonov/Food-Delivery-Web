import React from 'react';
import { Formik } from "formik";
import { connect } from "react-redux";
import { Slide } from "react-reveal";

import DeliveryInfoForm from "./Form";
import { updateRestaurantOwnerProfile } from "data/actions/userActions";
import { validateInputsLengths, validateNumberInputs } from "global/formikValidations/formikValidations";

const DeliveryInfo = ({ user, updateRestaurantOwnerProfile }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={{
                freeDeliveryThreshold: user.freeDeliveryThreshold || '',
                address: user.address || '',
                phone: user.phone || ''
            }}
            validate={values => {
                return {
                    ...validateInputsLengths(values, ['address'], 5, 50),
                    ...validateNumberInputs(values, ['freeDeliveryThreshold', 'phone']),
                    ...validateInputsLengths(values, ['phone'], 8, 20)
                };
            }}
            onSubmit={values => updateRestaurantOwnerProfile({ _id: user._id, ...values })}
        >
            {
                props => (
                    <Slide bottom duration={300}>
                        <DeliveryInfoForm {...props} />
                    </Slide>
                )
            }
        </Formik>
    )
}

const mapDispatchToPorps = { updateRestaurantOwnerProfile };

export default connect(null, mapDispatchToPorps)(DeliveryInfo);
