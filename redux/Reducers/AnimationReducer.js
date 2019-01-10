import * as Actions from '../Actions/ActionTypes'

const AnimationReducer = (state = { loadAnimation: true }, action) => {
    switch (action.type) {
        case Actions.LOAD_ANIMATION:
            return Object.assign({}, state, {
                loadAnimation: !state.loadAnimation
            });

        default:
            return state;
    }
}


export default AnimationReducer;