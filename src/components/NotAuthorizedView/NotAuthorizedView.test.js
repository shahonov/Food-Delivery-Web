import React from 'react';
import { create } from 'react-test-renderer';

import NotAuthorizedView from '.';

describe('NotAuthorizedView', () => {
    it('should render its contents', () => {
        const component = create(<NotAuthorizedView />);
        const elements = component.root.findAllByType('h5');
        expect(elements.length).toEqual(1);
        expect(elements[0].props.className).toEqual('MuiTypography-root special access-message MuiTypography-h5 MuiTypography-alignCenter');
        expect(elements[0].props.children).toEqual('Sorry, but you are not authorized to access this page');
    });
});
