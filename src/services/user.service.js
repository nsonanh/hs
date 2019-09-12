const config = require('../config/config');
import { authHeader } from '../helpers/auth-header';
import router from '../router/index';
import querystring from 'querystring';

export const userService = {
    login,
    logout
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
            username: username,
            password: password,
            grant_type: 'password',
            client_id: 'null',
            client_secret: 'null'
        })
    };

    return fetch('http://localhost:3000/auth/login', requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if there's a jwt token in the response
            if (response.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('username', username);
                router.push('dashboard');
            }

            return response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('login');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}