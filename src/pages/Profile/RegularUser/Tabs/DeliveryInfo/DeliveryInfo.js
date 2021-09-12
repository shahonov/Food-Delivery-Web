import React from 'react';
import { Formik } from "formik";
import { Slide } from "react-reveal";
import { connect } from "react-redux";

import DeliveryInfoForm from "./Form";
import { updateRegularUserProfile } from "data/actions/userActions";
import { validateInputsLengths, validateNumberInputs } from "global/formikValidations/formikValidations";

const DeliveryInfo = ({ user, updateRegularUserProfile }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={{
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                deliveryAddress: user.deliveryAddress || '',
                phone: user.phone || ''
            }}
            validate={values => {
                return {
                    ...validateInputsLengths(values, ['firstName', 'lastName'], 2, 20),
                    ...validateInputsLengths(values, ['deliveryAddress'], 5, 50),
                    ...validateInputsLengths(values, ['phone'], 8, 20),
                    ...validateNumberInputs(values, ['phone'])
                };
            }}
            onSubmit={values => updateRegularUserProfile({ _id: user._id, ...values })}
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

const mapDispatchToPorps = { updateRegularUserProfile };

export default connect(null, mapDispatchToPorps)(DeliveryInfo);