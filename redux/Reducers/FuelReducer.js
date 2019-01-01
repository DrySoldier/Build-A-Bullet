import * as Actions from '../Actions/ActionTypes'

const FuelReducer = (state = { fuel: 1 }, action) => {
    switch (action.type) {
        case Actions.INCREMENT_FUEL:
            return Object.assign({}, state, {
                fuel: state.fuel + 1
            });

        case Actions.DECREMENT_FUEL:
        return Object.assign({}, state, {
            fuel: state.fuel - 1
        });

        default:
            return state;
    }
}


export default FuelReducer;