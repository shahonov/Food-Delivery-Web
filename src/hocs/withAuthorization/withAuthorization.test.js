import React from 'react';
import { Provider } from 'react-redux';
import { create, act } from 'react-test-renderer';

import { store } from 'data/store';
import { roles } from 'global/roles';
import { withAuthorization } from '.';
import { SIGN_IN_SUCCESS } from 'data/actionTypes';

const TestComponent = ({ test }) => {
    return (
        <div className='test-test'>{test}</div>
    )
}

describe('withAuthorization', () => {
    it('should render not authorized view when user is not with required role', () => {
        const user = { _id: 123, role: roles.regularUser };
        act(() => {
            store.dispatch(({ type: SIGN_IN_SUCCESS, payload: user }));
        });
        const WithAuth = withAuthorization(TestComponent, [roles.restaurantOwner]);
        const withAuth = create(
            <Provider store={store}>
                <WithAuth />
            </Provider>
        );
        const elements = withAuth.root.findAllByType('h5');
        expect(elements.length).toEqual(1);
        expect(elements[0].props.children).toEqual('Sorry, but you are not authorized to access this page');
        expect(elements[0].props.className).toEqual('MuiTypography-root special access-message MuiTypography-h5 MuiTypography-alignCenter');
    });

    it('should render test component when user is with required role', () => {
        const user = { _id: 123, role: roles.restaurantOwner };
        act(() => {
            store.dispatch(({ type: SIGN_IN_SUCCESS, payload: user }));
        });
        const WithAuth = withAuthorization(TestComponent, [roles.restaurantOwner]);
        const withAuth = create(
            <Provider store={store}>
                <WithAuth />
            </Provider>
        );
        const divs = withAuth.root.findAllByProps({ className: 'test-test' });
        expect(divs.length).toEqual(1);
    });
});
