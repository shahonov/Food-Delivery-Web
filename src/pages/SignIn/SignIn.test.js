import React from 'react';
import { Formik } from 'formik';
import renderer from 'react-test-renderer';

import SignIn from './SignIn';
import SignInForm from './SignInForm';
import { Provider } from 'react-redux';
import { store } from 'data/store';

describe('SignIn', () => {
    it('should have sign in container', () => {
        const component = renderer.create(<Provider store={store}><SignIn /></Provider>);
        const containerCount = component.root.findAllByProps(
            { className: 'sign-in-container' }
        ).length;
        expect(containerCount).toEqual(1);
    });

    it('should have Formik component', () => {
        const component = renderer.create(<Provider store={store}><SignIn /></Provider>);
        const formik = component.root.findAllByType(Formik).length;
        expect(formik).toEqual(1);
    });

    it('should have SignInForm component', () => {
        const component = renderer.create(<Provider store={store}><SignIn /></Provider>);
        const form = component.root.findAllByType(SignInForm).length;
        expect(form).toEqual(1);
    });
});
