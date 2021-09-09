import React from 'react';
import { Provider } from 'react-redux';
import { create, act } from 'react-test-renderer';

import { store } from 'data/store';
import { withAuthentication } from '.';
import { SIGN_IN_SUCCESS } from 'data/actionTypes';

const TestComponent = ({ test }) => {
    return (
        <div className='test-test'>{test}</div>
    )
}

describe('withAuthentication', () => {
    it('should render not authenticated view when user is not signed in', () => {
        const WithAuth = withAuthentication(TestComponent);
        const withAuth = create(
            <Provider store={store}>
                <WithAuth />
            </Provider>
        );
        const elements = withAuth.root.findAllByType('h5');
        expect(elements.length).toEqual(1);
        expect(elements[0].props.children).toEqual('Sorry, but you are not authenticated and cannot access this page');
        expect(elements[0].props.className).toEqual('MuiTypography-root special access-message MuiTypography-h5 MuiTypography-alignCenter');
    });

    it('should render test component when user is signed in', () => {
        const user = { _id: 123 };
        act(() => {
            store.dispatch(({ type: SIGN_IN_SUCCESS, payload: user }));
        });
        const WithAuth = withAuthentication(TestComponent);
        const withAuth = create(
            <Provider store={store}>
                <WithAuth />
            </Provider>
        );
        const divs = withAuth.root.findAllByProps({ className: 'test-test' });
        expect(divs.length).toEqual(1);
    });
});
