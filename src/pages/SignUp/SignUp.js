import React from 'react';
import { Formik } from 'formik';
import { Slide } from 'react-reveal';
import { connect } from 'react-redux';

import { signUp } from 'data/actions/userActions';
import SignUpForm from './SignUpForm';
import { roles } from 'global/roles';
import {
    validatePasswords,
    validateEmailInputs,
    validatePasswordsMatch
} from 'global/formikValidations';

import './SignUp.scss';

const SignIn = ({ signUp }) => {
    return (
        <div className='sign-up-container'>
            <Formik
                enableReinitialize
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    userRole: roles.regularUser
                }}
                validate={values => {
                    return {
                        ...validateEmailInputs(values, ['email']),
                        ...validatePasswords(values, ['password', 'confirmPassword']),
                        ...validatePasswordsMatch(values, ['password', 'confirmPassword'])
                    };
                }}
                onSubmit={values => signUp(values.email, values.password, values.userRole)}
            >
                {
                    props => (
                        <Slide bottom duration={300}>
                            <SignUpForm {...props} />
                        </Slide>
                    )
                }
            </Formik>
        </div>
    );
}

const mapDispatchToProps = { signUp };

export default connect(null, mapDispatchToProps)(SignIn);
