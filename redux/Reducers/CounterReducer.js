import * as Actions from '../Actions/ActionTypes'

const CounterReducer = (state = { count: 20000 }, action) => {
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
        case Actions.COUNTER_INCREMENT_TWENTYFIVE:
            return Object.assign({}, state, {
                count: state.count + 25
            });
        case Actions.COUNTER_INCREMENT_THIRTY:
            return Object.assign({}, state, {
                count: state.count + 30
            });
        case Actions.COUNTER_INCREMENT_THIRTYFIVE:
            return Object.assign({}, state, {
                count: state.count + 35
            });
        case Actions.COUNTER_INCREMENT_FORTY:
            return Object.assign({}, state, {
                count: state.count + 40
            });


        default:
            return state;
    }
}


export default CounterReducer;