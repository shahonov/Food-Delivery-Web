import {
    CREATE_ORDER_SUCCESS,
    EDIT_ORDER_STATUS_SUCCESS,
    GET_OWNER_ORDERS_SUCCESS,
    GET_USER_ORDERS_SUCCESS
} from "data/actionTypes";

const initialState = {
    all: []
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_SUCCESS: return { all: [...state.all, action.payload] };
        case GET_OWNER_ORDERS_SUCCESS: return { all: action.payload };
        case GET_USER_ORDERS_SUCCESS: return { all: action.payload };
        case EDIT_ORDER_STATUS_SUCCESS: {
            const { _id, status, statusChangelogObj } = action.payload;
            const foundItem = state.all.find(x => x._id === _id);
            const index = state.all.indexOf(foundItem);
            const copy = state.all.slice();
            debugger;
            foundItem.status = status;
            foundItem.statusChangelog.push(statusChangelogObj);
            copy.splice(index, 1, foundItem);
            return {
                ...state,
                all: copy
            };
        }
        default: return state;
    }
}