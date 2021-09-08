import { Typography } from '@material-ui/core';

import './NotAuthenticatedView.scss';

const NotAuthenticatedView = () => {
    return (
        <Typography
            variant='h5'
            align='center'
            className='special access-message'
        >
            Sorry, but you are not authenticated and cannot access this page
        </Typography>
    )
}

export default NotAuthenticatedView;
