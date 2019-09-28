const config = require('../config/config.js');
// import { authHeader } from '../helpers/auth-header';
import router from '../router/index';
// import querystring from 'querystring';
const firebase = require('firebase');
firebase.initializeApp(config.firebaseConfig);

// var admin = require("firebase-admin");
// admin.initializeApp({
//     credential: admin.credential.cert(config.firebaseCredential),
//     databaseURL: config.firebaseConfig.databaseURL
// });

export const userService = {
    login,
    logout
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

// function login(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: querystring.stringify({
//             username: username,
//             password: password,
//             grant_type: 'password',
//             client_id: 'null',
//             client_secret: 'null'
//         })
//     };

//     return fetch('http://192.168.0.108:3000/auth/login', requestOptions)
//         .then(handleResponse)
//         .then(response => {
//             // login successful if there's a jwt token in the response
//             if (response.access_token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('token', response.access_token);
//                 localStorage.setItem('username', username);
//                 router.push('dashboard');
//             }
//             return response;
//         })
//         .catch(() => {
//             alert('Tên tài khoản hoặc mật khẩu không đúng');
//         });
// }

async function login(email, password) {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error login: ' + errorMessage);
        alert('Tên tài khoản hoặc mật khẩu không đúng');
    });
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('token', res.user.stsTokenManager);
    localStorage.setItem('user', res.user);
    router.push('dashboard');
}

async function logout() {
    await firebase.auth().signOut();
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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