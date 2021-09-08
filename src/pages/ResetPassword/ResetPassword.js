import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import { Formik } from 'formik';

import ResetPasswordForm from './Form';
import { notificationTypes } from 'constants/notificationTypes';
import { showNotification } from 'data/actions/notificationActions';
import { resetPassword, validateResetId } from 'data/actions/userActions';
import { validatePasswords, validatePasswordsMatch } from 'global/formikValidations';

import './ResetPassword.scss';

const ResetPassword = ({
    showNotification,
    validateResetId,
    resetPassword
}) => {
    const history = useHistory();
    const { resetId } = useParams();

    useEffect(() => {
        (async () => {
            const isSuccess = await validateResetId(resetId);
            if (!isSuccess) {
                history.push('/');
                showNotification('could not validate reset password request', notificationTypes.error);
            }
        })();
        // eslint-disable-next-line
    }, [resetId]);

    const handleResetPassword = async newPassword => {
        const isSuccess = await resetPassword(resetId, newPassword);
        if (isSuccess) {
            history.push('/sign-in');
        }
    }

    return (
        <div className='reset-password-container'>
            <Formik
                enableReinitialize
                initialValues={{
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validate={values => {
                    return {
                        ...validatePasswords(values, ['newPassword', 'confirmNewPassword']),
                        ...validatePasswordsMatch(values, ['newPassword', 'confirmNewPassword'])
                    };
                }}
                onSubmit={values => handleResetPassword(values.newPassword)}
            >
                {
                    props => (
                        <Slide bottom duration={300}>
                            <ResetPasswordForm {...props} />
                        </Slide>
                    )
                }
            </Formik>
        </div>
    );
}

const mapDispatchToProps = {
    showNotification,
    validateResetId,
    resetPassword
};

export default connect(null, mapDispatchToProps)(ResetPassword);
