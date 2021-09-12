import React from 'react';
import { Formik } from 'formik';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';
import { create, act } from 'react-test-renderer';

import SignIn from './SignIn';
import SignInForm from './SignInForm';
import { store } from 'data/store';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        useHistory: () => {
            return {
                push: mockHistoryPush
            };
        }
    }
})

beforeEach(() => {
    store.dispatch = jest.fn();
});

describe('SignIn', () => {
    it('should have sign in container', () => {
        const component = create(<Provider store={store}><SignIn /></Provider>);
        const containerCount = component.root.findAllByProps(
            { className: 'sign-in-container' }
        ).length;
        expect(containerCount).toEqual(1);
    });

    it('should have Formik component', () => {
        const component = create(<Provider store={store}><SignIn /></Provider>);
        const formik = component.root.findAllByType(Formik).length;
        expect(formik).toEqual(1);
    });

    it('should have SignInForm component', () => {
        const component = create(<Provider store={store}><SignIn /></Provider>);
        const form = component.root.findAllByType(SignInForm).length;
        expect(form).toEqual(1);
    });

    it('should not call signIn when invalid inputs', async () => {
        const component = create(<Provider store={store}><SignIn /></Provider>);
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        });
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should call signIn when valid inputs', async () => {
        const component = create(<Provider store={store}><SignIn /></Provider>);
        const emailInput = component.root.findByProps({ name: 'email' });
        const passwordInput = component.root.findByProps({ name: 'password' });
        await act(async () => {
            emailInput.props.onChange({ target: { name: 'email', value: 'asdasd@asd.asd' } });
            passwordInput.props.onChange({ target: { name: 'password', value: 'Asdasd123!' } });
        });
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
        expect(store.dispatch).toHaveBeenCalled();
    });
});
