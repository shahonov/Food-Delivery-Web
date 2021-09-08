import { ADD_OWNER_MEAL, DELETE_OWNER_MEAL, GET_OWNER_MEALS } from "data/actionTypes";

const initialState = {
    all: [],
    totalCount: 0
};

export const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OWNER_MEALS: return action.payload;
        case ADD_OWNER_MEAL: return {
            all:
                [
                    ...state.all,
                    action.payload
                ],
            totalCount: action.payload.totalCount
        };
        case DELETE_OWNER_MEAL: {
            const index = state.all.findIndex(x => x._id === action.payload);
            const copy = state.all.slice();
            copy.splice(index, 1);
            return { all: copy };
        }
        default: return state;
    }
}
