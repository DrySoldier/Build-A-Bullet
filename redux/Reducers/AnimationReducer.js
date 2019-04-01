import * as Actions from '../Actions/ActionTypes'

const AnimationReducer = (state = { loadAnimation: true, currentDelay: 2000 }, action) => {
    switch (action.type) {
        case Actions.LOAD_ANIMATION:
            return Object.assign({}, state, {
                loadAnimation: !state.loadAnimation
            });

        case Actions.DECREASE_DELAY:
            return Object.assign({}, state, {
                currentDelay: state.currentDelay - 100
            });

        case Actions.DEFAULT_DELAY:
            return Object.assign({}, state, {
                currentDelay: 1750
            });

        case Actions.DEFAULT_LOW_DELAY:
            return Object.assign({}, state, {
                currentDelay: 0
            });

        default:
            return state;
    }
}


export default AnimationReducer;