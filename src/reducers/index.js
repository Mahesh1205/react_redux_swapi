import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { planetReducer } from './planet.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  planets:planetReducer,
  alert
});

export default rootReducer;