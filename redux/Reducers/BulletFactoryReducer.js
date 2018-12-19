import * as Actions from '../Actions/ActionTypes'

const BulletFactoryReducer = (state = { bulletFactoriesBought: 0, priceOfBulletFactory: 500 }, action) => {
    switch (action.type) {
        case Actions.BUY_BULLET_FACTORY:
            return Object.assign({}, state, {
                bulletFactoriesBought: state.bulletFactoriesBought += 1,
                priceOfBulletFactory: state.priceOfBulletFactory += Math.round(state.priceOfBulletFactory * 5 / 8)
            });

        default:
            return state;
    }
}


export default BulletFactoryReducer;