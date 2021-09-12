import React from 'react';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';
import { create, act } from 'react-test-renderer';

import ForgottenPassword from '.';
import { store } from 'data/store';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        useHistory: () => {
            return {
                push: mockHistoryPush
            }
        }
    }
});

describe('ForgottenPassword', () => {
    it('should call history.push with index', async () => {
        store.dispatch = jest.fn();
        const component = create(<Provider store={store}><ForgottenPassword /></Provider>);
        const emailInput = component.root.findByProps({ name: 'email' });
        await act(async () => {
            emailInput.props.onChange({ target: { name: 'email', value: 'asdasd@asd.asd' } });
        });
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        });
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should display email errors', async () => {
        const component = create(<Provider store={store}><ForgottenPassword /></Provider>);
        const emailInput = component.root.findByProps({ name: 'email' });
        await act(async () => {
            emailInput.props.onChange({ target: { name: 'email', value: 123 } });
        })
        await act(async () => {
            component.root.findByType(Button).props.onClick();
        })
        const errorMsg = component.root.findByProps({ className: 'invalid-form-input' });
        expect(errorMsg.children).toEqual(['Not a valid email address']);
    })
});
