import axios from 'axios';
import _ from 'lodash';


export const swapiService = {
    authenticateUser,
    getSinglePlanetData,
    getPlanetsData,
    logout
};

const API_BASE_URL = 'https://swapi.co/api';
function authenticateUser(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `${API_BASE_URL}/people/?search=${username}`
    };


   return axios(requestOptions)
        .then(users => {
            var user ='';
           // var user = _.filter(users.data.results, (user)=> { user.name === username &&  user.DOB == password});
            if(!_.isEmpty(user)){
                 localStorage.setItem('user', JSON.stringify(user));
                 return user;
            } else{               
                           return Promise.reject('User name or password is incorrect..!'); 
            }
        }).catch((err) => {
            logout();
        });
}

export function getPlanetsData(planetInitials){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `${API_BASE_URL}/planets/?search=${planetInitials}`
    };
   return axios(requestOptions).then((planets) =>{
    return planets.data.results;
   });
}

export function getSinglePlanetData(planetName){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `${API_BASE_URL}/planet/${planetName}`
    };

   return axios(requestOptions).then((planets) =>{
    return planets.data.results;
   });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

