import React from 'react';
import { Formik } from 'formik';
import { Slide } from 'react-reveal';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ForgottenPasswordForm from './Form';
import { validateEmailInputs } from 'global/formikValidations';
import { sendResetPasswordEmail } from 'data/actions/userActions';

import './ForgottenPassword.scss';

const ForgottenPassword = ({ sendResetPasswordEmail }) => {
    const history = useHistory();

    const handleSendResetPasswordEmail = async email => {
        const isSuccess = await sendResetPasswordEmail(email);
        if (isSuccess) {
            history.push('/');
        }
    }

    return (
        <div className='forgotten-password-container'>
            <Formik
                enableReinitialize
                initialValues={{
                    email: ''
                }}
                validate={values => {
                    return {
                        ...validateEmailInputs(values, ['email'])
                    };
                }}
                onSubmit={values => handleSendResetPasswordEmail(values.email)}
            >
                {
                    props => (
                        <Slide bottom duration={300}>
                            <ForgottenPasswordForm {...props} />
                        </Slide>
                    )
                }
            </Formik>
        </div>
    );
}

const mapDispatchToProps = { sendResetPasswordEmail };

export default connect(null, mapDispatchToProps)(ForgottenPassword);
