import { combineReducers, createStore } from 'redux';

import counterReducer from './CounterReducer';
import bulletMachineReducer from './BulletMachineReducer';
import bulletFactoryReducer from './BulletFactoryReducer';

const AppReducers = combineReducers({
    counterReducer,
    bulletMachineReducer,
    bulletFactoryReducer,
});


const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;