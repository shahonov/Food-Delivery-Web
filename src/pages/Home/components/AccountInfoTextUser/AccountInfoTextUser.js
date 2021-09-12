import React from 'react';
import { Typography } from '@material-ui/core';

const AccountInfoTextUser = ({ fields }) => {
    return (
        <Typography
            className='syncopate account-info-text'
            align='center'
            variant='h6'
        >
            Fill your <strong>{fields}</strong> in <strong>Profile</strong> section so we can make your experience <strong>smoother</strong>
        </Typography>
    )
}

export default AccountInfoTextUser;
