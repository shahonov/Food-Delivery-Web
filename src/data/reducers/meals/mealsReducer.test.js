const { GET_OWNER_MEALS, ADD_OWNER_MEAL, DELETE_OWNER_MEAL, CHANGE_MEAL_ORDER } = require("data/actionTypes");
const { mealsReducer } = require("./mealsReducer");

let initialState = {};
beforeEach(() => {
    initialState = {
        all: [],
        totalCount: 0
    }
});

describe('mealsReducer', () => {
    it('should return meals when get owner meals action type', () => {
        const payload = { all: [{ mealId: '1' }, { mealId: '2' }] };
        const action = { type: GET_OWNER_MEALS, payload };
        const result = mealsReducer(initialState, action);
        expect(result).toEqual(payload);
    });

    it('should return meals plus added meal when add owner meal action type', () => {
        const payload = { mealId: '1', mealName: 'pizza' };
        const action = { type: ADD_OWNER_MEAL, payload };
        const result = mealsReducer(initialState, action);
        expect(result).toEqual({ all: [payload] });
    });

    it('should return meals minus deleted meal when delete owner meal action type', () => {
        initialState = {
            all: [
                { _id: '1' },
                { _id: '2' }
            ]
        };
        const payload = '1';
        const action = { type: DELETE_OWNER_MEAL, payload };
        const result = mealsReducer(initialState, action);
        expect(result).toEqual({ all: [{ _id: '2' }] });
    });

    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = mealsReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should swap meals orderIds', () => {
        initialState = {
            all: [
                {
                    _id: 123,
                    name: 'Pizza',
                    orderId: 1
                },
                {
                    _id: 321,
                    name: 'Soup',
                    orderId: 2
                }
            ]
        }
        const payload = { mealId: 321, oldOrderId: 2, newOrderId: 1 };
        const action = { type: CHANGE_MEAL_ORDER, payload };
        const result = mealsReducer(initialState, action);
        const expected = [
            {
                _id: 123,
                name: 'Pizza',
                orderId: 2
            },
            {
                _id: 321,
                name: 'Soup',
                orderId: 1
            }
        ]
        expect(result.all).toEqual(expected);
    });
});
