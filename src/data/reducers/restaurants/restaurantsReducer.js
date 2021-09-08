import { GET_RESTAURANTS_SUCCESS } from "data/actionTypes"

const initialState = {
    all: [],
    totalCount: 0
}

export const restaurantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANTS_SUCCESS: return action.payload;
        default: return state;
    }
}
