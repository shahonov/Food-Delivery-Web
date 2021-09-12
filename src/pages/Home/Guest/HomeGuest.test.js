import React from 'react';
import { create } from 'react-test-renderer';
import { Typography } from '@material-ui/core';

import Guest from '.';

describe('Guest', () => {
    it('should render its contents', () => {
        const component = create(<Guest />);
        const typography = component.root.findByType(Typography);
        const strongs = component.root.findAllByType('strong');
        expect(typography.props.className).toEqual('syncopate action-text');
        expect(typography.props.variant).toEqual('h6');
        expect(typography.props.align).toEqual('center');
        expect(strongs.length).toEqual(3);
    });
});
