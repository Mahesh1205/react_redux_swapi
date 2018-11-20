
import { swapiService,  } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { userConstants } from '../constants/user.constants';
import _ from 'lodash';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        swapiService.authenticateUser(username, password)
            .then(
                user => {
                    if(!_.isEmpty(user)){
                        dispatch(success(user));
                        history.push('/app');
                    }
                    else{
                        dispatch(failure(user));
                        alert("Username and password is incorrect");
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    swapiService.logout();
    return { type: userConstants.LOGOUT };
}


