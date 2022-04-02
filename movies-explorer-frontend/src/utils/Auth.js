export const BASE_URL = 'http://localhost:3002';

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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(checkResponse)
        .then(data => data)
}