import { API_BASE_URL, ACCESS_TOKEN, BASE_URL } from '../constants';

//Husam Almanakly - Code for any API Calls to the server
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    // location.reload();
    // console.log(localStorage.getItem(ACCESS_TOKEN));
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function logout(logoutRequest) {
    return request({
        url: API_BASE_URL + "/auth/logout",
        method: 'POST',
        body: JSON.stringify(logoutRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function fetchGoogle(url){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: url,
        method: 'GET'
    });
}

export function saveItem(url, values){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    console.log(JSON.stringify(values))

    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(values)
    });
}

export function getFavorites(url){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: url,
        method: 'GET',
    });
}

export function delFav(url, id){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    url = url + "?id=" + id;

    return request({
        url: url,
        method: 'GET',
    });
}


export const onSubmit = (e) => {
    e.preventDefault();
    // console.log("refresh prevented");
};