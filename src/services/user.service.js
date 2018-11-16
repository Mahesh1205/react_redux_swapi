import axios from 'axios';
import _ from 'lodash';


export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: `https://swapi.co/api/people/?search=${username}`
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

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

