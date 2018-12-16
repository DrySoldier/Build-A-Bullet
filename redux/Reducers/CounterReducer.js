import * as Actions from '../Actions/ActionTypes'

const CounterReducer = (state = { count: 0, bulletMachinesBought: 0, priceOfBulletMachine: 500 }, action) => {
    switch (action.type) {
        case Actions.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        case Actions.COUNTER_DECREMENT:
            return Object.assign({}, state, {
                count: state.count - 1
            });
        case Actions.BUY_BULLET_MACHINE:
            if (state.count >= state.priceOfBulletMachine) {
                return Object.assign({}, state, state, {
                    count: state.count -= state.priceOfBulletMachine,
                    bulletMachinesBought: state.bulletMachinesBought += 1
                });
            } else {
                alert('You cannot afford this!')
            }

        default:
            return state;
    }
}

export default CounterReducer;