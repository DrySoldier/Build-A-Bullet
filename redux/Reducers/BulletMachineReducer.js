import * as Actions from '../Actions/ActionTypes'

const BulletMachineReducer = (state = { bulletMachinesBought: 0, priceOfBulletMachine: 150 }, action) => {
    switch (action.type) {
        case Actions.BUY_BULLET_MACHINE:
            return Object.assign({}, state, {
                bulletMachinesBought: state.bulletMachinesBought += 1,
                priceOfBulletMachine: state.priceOfBulletMachine += Math.round(state.priceOfBulletMachine * 5 / 8)
            });

        default:
            return state;
    }
}


export default BulletMachineReducer;