import axios from 'axios';
import _ from 'lodash';


export function getPlanetData(planetInitials){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `https://swapi.co/api/planets/?search=${planetInitials}`
    };


   return axios(requestOptions).then((planets) =>{
    // do filtering here..

    return planets.data.results;

   })

}