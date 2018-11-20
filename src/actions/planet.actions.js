import { swapiService } from '../services';
import { alertActions } from './';
import { planetConstants } from '../constants/planet.constants';
import _ from 'lodash';

export const planetActions = {
    getSinglePlanetData,
    getPlanetsData,
    clearPlanetSuggestions
};

function getSinglePlanetData(planetUrl) {
    return dispatch => {        
       return swapiService.getSinglePlanetData(planetUrl)
        .then(
            response => {
                if(response && response.data && !_.isEmpty(response.data)){
                    dispatch(success(response.data));
                }else{ 
                dispatch(success([]));   
                }   
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
        }
        function success(planet) { return { type: planetConstants.SINGLE_PLANET_REQUEST_SUCCESS, data: planet } }
        function failure(error) { return { type: planetConstants.SINGLE_PLANET_REQUEST_FAILURE, error } }
    }    
    
function getPlanetsData(searchQuery) {
    return dispatch => {
        dispatch(request({ searchQuery }));
        swapiService.getPlanetsData(searchQuery)
            .then(
                response => {
                    if(response && response.data && !_.isEmpty(response.data.results)){
                        dispatch(success(response.data.results));
                    }else{ 
                    dispatch(success([]));   
                    }  
                    return response.data.results;                  
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    return [];
                }
                
            );
    };

    function request(searchQuery) { return { type: planetConstants.PLANET_REQUEST, searchQuery } }
    function success(searchResults) { return { type: planetConstants.PLANET_REQUEST_SUCCESS, data: searchResults }  }
    function failure(error) { return { type: planetConstants.PLANET_REQUEST_FAILURE, error } }
}

function clearPlanetSuggestions(){
    return {
       type: planetConstants.CLEAR_PLANETS
    }
}
    