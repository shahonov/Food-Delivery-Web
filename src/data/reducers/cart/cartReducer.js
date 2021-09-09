import {
    CLEAR_CART_SUCCESS,
    ADD_MEAL_TO_CART_SUCCESS,
    REMOVE_MEAL_FROM_CART_SUCCESS,
} from "data/actionTypes"

const initialState = {
    meals: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MEAL_TO_CART_SUCCESS: {
            const found = state.meals.find(x => x._id === action.payload._id);
            if (found) {
                const index = state.meals.indexOf(found);
                const copy = state.meals.slice();
                found.quantity += action.payload.quantity;
                copy.splice(index, 1, found);
                return {
                    ...state,
                    meals: copy
                }
            } else {
                return {
                    ...state,
                    meals: [...state.meals, action.payload]
                }
            }
        }
        case REMOVE_MEAL_FROM_CART_SUCCESS: {
            const foundIndex = state.meals.findIndex(x => x._id === action.payload);
            const copy = state.meals.slice();
            copy.splice(foundIndex, 1);
            return {
                ...state,
                meals: copy
            };
        }
        case CLEAR_CART_SUCCESS: return initialState;
        default: return state;
    }
}
