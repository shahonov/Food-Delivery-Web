const { GET_RESTAURANTS_SUCCESS } = require("data/actionTypes");
const { restaurantsReducer } = require(".");

let initialState = {};
beforeEach(() => {
    initialState = {
        all: [],
        totalCount: 0
    }
});

describe('restaurantsReducer', () => {
    it('should return current state when unknown action type', () => {
        const action = { type: 'UNKNOWN' };
        const result = restaurantsReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should return restaurants when get restaurants action type', () => {
        const payload = {
            all: [
                {
                    _id: 111,
                    name: 'McDonalds'
                },
                {
                    _id: 222,
                    name: 'Burger King'
                }
            ],
            totalCount: 2
        }
        const action = { type: GET_RESTAURANTS_SUCCESS, payload };
        const result = restaurantsReducer(initialState, action);
        expect(result).toEqual(payload);
    });
})
