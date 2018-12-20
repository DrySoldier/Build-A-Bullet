import * as Actions from '../Actions/ActionTypes'

const CounterReducer = (state = { count: 100000 }, action) => {
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            });
        case Actions.COUNTER_INCREMENT_FIVE:
            return Object.assign({}, state, {
                count: state.count + 5
            });
        case Actions.COUNTER_INCREMENT_TEN:
            return Object.assign({}, state, {
                count: state.count + 10
            });
        case Actions.COUNTER_INCREMENT_FIFTEEN:
            return Object.assign({}, state, {
                count: state.count + 15
            });
        case Actions.COUNTER_INCREMENT_TWENTY:
            return Object.assign({}, state, {
                count: state.count + 20
            });

        default:
            return state;
    }
}


export default CounterReducer;