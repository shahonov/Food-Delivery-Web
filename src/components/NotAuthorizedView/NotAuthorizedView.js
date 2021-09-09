import React from 'react';
import { Typography } from '@material-ui/core';

import './NotAuthorizedView.scss';

const NotAuthorizedView = () => {
    return (
        <Typography
            variant='h5'
            align='center'
            className='special access-message'
        >
            Sorry, but you are not authorized to access this page
        </Typography>
    )
}

export default NotAuthorizedView;
