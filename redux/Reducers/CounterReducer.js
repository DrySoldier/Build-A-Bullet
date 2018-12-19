import * as Actions from '../Actions/ActionTypes'

const CounterReducer = (state = { count: 5000 }, action) => {
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            });

        case Actions.COUNTER_FACTORY_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 3
            });

        default:
            return state;
    }
}


export default CounterReducer;