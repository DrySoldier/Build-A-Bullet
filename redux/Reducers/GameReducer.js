import * as Actions from '../Actions/ActionTypes'

const gameReducer = (state = { gameOver: false }, action) => {
    switch (action.type) {
        case Actions.GAME_OVER:
            return Object.assign({}, state, {
                gameOver: !state.gameOver
            });

        default:
            return state;
    }
}


export default gameReducer;