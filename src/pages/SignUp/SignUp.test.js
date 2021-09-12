import React from 'react';
import { Formik } from 'formik';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';
import { create, act } from 'react-test-renderer';

import SignUp from './SignUp';
import { store } from 'data/store';
import SignUpForm from './SignUpForm';

beforeEach(() => {
    store.dispatch = jest.fn();
});

describe('SignUp', () => {
    it('should have sign up container', () => {
        const component = create(<Provider store={store}><SignUp /></Provider>);
        const containerCount = component.root.findAllByProps(
            { className: 'sign-up-container' }
        ).length;
        expect(containerCount).toEqual(1);
    });

    it('should have Formik component', () => {
        const component = create(<Provider store={store}><SignUp /></Provider>);
        const formik = component.root.findAllByType(Formik).length;
        expect(formik).toEqual(1);
    });

    it('should have SignInForm component', () => {
        const component = create(<Provider store={store}><SignUp /></Provider>);
        const form = component.root.findAllByType(SignUpForm).length;
        expect(form).toEqual(1);
    });

    it('should not call signIn when invalid inputs', async () => {
        const component = create(<Provider store={store}><SignUp /></Provider>);
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        });
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should call signIn when valid inputs', async () => {
        const component = create(<Provider store={store}><SignUp /></Provider>);
        const emailInput = component.root.findByProps({ name: 'email' });
        const passwordInput = component.root.findByProps({ name: 'password' });
        const confirmPasswordInput = component.root.findByProps({ name: 'confirmPassword' });
        await act(async () => {
            emailInput.props.onChange({ target: { name: 'email', value: 'asdasd@asd.asd' } });
            passwordInput.props.onChange({ target: { name: 'password', value: 'Asdasd123!' } });
            confirmPasswordInput.props.onChange({ target: { name: 'confirmPassword', value: 'Asdasd123!' } });
        });
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        });
        expect(store.dispatch).toHaveBeenCalled();
    });
});
