import { Typography } from "@material-ui/core";

import './Guest.scss';

const Guest = () => {
    return (
        <div>
            <Typography className='syncopate action-text' variant='h6' align='center'>
                <strong>Log in</strong> to gain <strong>access</strong> to <strong>all features</strong>
            </Typography>
        </div>
    )
}

export default Guest;
