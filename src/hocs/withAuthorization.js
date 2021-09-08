import { connect } from 'react-redux';

import NotAuthorizedView from "components/NotAuthorizedView";

export const withAuthorization = (Component, roles) => {
    const HOC = ({ role, ...rest }) => {
        return (
            roles.includes(role)
                ?
                <Component {...rest} />
                :
                <NotAuthorizedView />
        )
    }

    const mapStateToProps = state => ({ role: state.user.role });

    return connect(mapStateToProps)(HOC);
}
