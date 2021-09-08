import React from 'react';
import { Formik } from 'formik';
import { Slide } from 'react-reveal';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signIn } from 'data/actions/userActions';
import SignInForm from './SignInForm';
import {
    validatePasswords,
    validateEmailInputs
} from 'global/formikValidations';

import './SignIn.scss';

const SignIn = ({ signIn }) => {
    const history = useHistory();
    return (
        <div className='sign-in-container'>
            <Formik
                enableReinitialize
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={values => {
                    return {
                        ...validateEmailInputs(values, ['email']),
                        ...validatePasswords(values, ['password'])
                    };
                }}
                onSubmit={async values => {
                    await signIn(values.email, values.password)
                    history.push('/');
                }}
            >
                {
                    props => (
                        <Slide bottom duration={300}>
                            <SignInForm {...props} />
                        </Slide>
                    )
                }
            </Formik>
        </div>
    );
}

const mapDispatchToProps = { signIn };

export default connect(null, mapDispatchToProps)(SignIn);
