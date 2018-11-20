import { planetConstants } from '../constants';

const initialState = {allPlanets : [], currentPlanet : {}};

export function planetReducer(state = initialState, action) {
  switch (action.type) {
    case planetConstants.PLANET_REQUEST:
      return {
        isLoading: true,
      };
      case planetConstants.CLEAR_PLANETS:
      return  {
        isLoading: true,
        allplanets:[]
      };
      
    case planetConstants.PLANET_REQUEST_SUCCESS:
      return {
        isLoading: false,
        allplanets: action.data
      };
      case planetConstants.PLANET_REQUEST_FAILURE:
      return {};
     case planetConstants.SINGLE_PLANET_REQUEST_FAILURE:
      return {};
      case planetConstants.SINGLE_PLANET_REQUEST_SUCCESS:
      return {  ...state.currentPlanet, ...{currentPlanet: action.data } };
    default:
      return state
  }
}