import React from 'react';
import { Formik } from 'formik';
import renderer from 'react-test-renderer';

import SignUp from './SignUp';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';
import { store } from 'data/store';

describe('SignUp', () => {
    it('should have sign up container', () => {
        const component = renderer.create(<Provider store={store}><SignUp /></Provider>);
        const containerCount = component.root.findAllByProps(
            { className: 'sign-up-container' }
        ).length;
        expect(containerCount).toEqual(1);
    });

    it('should have Formik component', () => {
        const component = renderer.create(<Provider store={store}><SignUp /></Provider>);
        const formik = component.root.findAllByType(Formik).length;
        expect(formik).toEqual(1);
    });

    it('should have SignInForm component', () => {
        const component = renderer.create(<Provider store={store}><SignUp /></Provider>);
        const form = component.root.findAllByType(SignUpForm).length;
        expect(form).toEqual(1);
    });
});
