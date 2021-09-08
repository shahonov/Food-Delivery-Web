import {
    REMOVE_FAVORITE_RESTAURANT,
    ADD_FAVORITE_RESTAURANT,
    SIGN_OUT_SUCCESS,
    SIGN_IN_SUCCESS,
    UPDATE_PROFILE,
    UNBLOCK_USER,
    BLOCK_USER,
} from "data/actionTypes";

const initialState = {
    expiration: 0,
    favoriteRestaurants: [],
    blockedUsers: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS: return action.payload;
        case SIGN_OUT_SUCCESS: return initialState;
        case UPDATE_PROFILE: return { ...state, ...action.payload };
        case ADD_FAVORITE_RESTAURANT: return {
            ...state,
            favoriteRestaurants: [...state.favoriteRestaurants, action.payload]
        }
        case REMOVE_FAVORITE_RESTAURANT: {
            const foundIndex = state.favoriteRestaurants.findIndex(x => x._id === action.payload);
            const copy = state.favoriteRestaurants.slice();
            copy.splice(foundIndex, 1);
            return {
                ...state,
                favoriteRestaurants: copy
            };
        }
        case BLOCK_USER: return {
            ...state,
            blockedUsers: [
                ...state.blockedUsers,
                action.payload.userId
            ]
        };
        case UNBLOCK_USER: {
            const { userId } = action.payload;
            const foundIndex = state.blockedUsers.indexOf(userId);
            const copy = state.blockedUsers.slice();
            copy.splice(foundIndex, 1);
            return {
                ...state,
                blockedUsers: copy
            };
        }
        default: return state;
    }
}
