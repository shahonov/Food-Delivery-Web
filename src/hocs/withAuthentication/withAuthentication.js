import React from 'react';
import { connect } from 'react-redux';

import NotAuthenticatedView from 'components/NotAuthenticatedView';

export const withAuthentication = (Component) => {
    const HOC = ({ _id, ...rest }) => {
        return (
            !!_id
                ?
                <Component {...rest} />
                :
                <NotAuthenticatedView />
        )
    }

    const mapStateToProps = state => ({ _id: state.user._id });

    return connect(mapStateToProps)(HOC);
}
