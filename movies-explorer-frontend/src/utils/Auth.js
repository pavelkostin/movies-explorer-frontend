/* export const BASE_URL = 'http://localhost:3003'; */
export const BASE_URL = 'http://api.movie-kpa.nomoredomains.rocks';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    /* return Promise.reject(`Ошибка ${res.statusText}`) */
    return Promise.reject(res.json());
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password
        })
    })
        .then(checkResponse)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
        .then(checkResponse)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(checkResponse)
        .then(data => data)
}