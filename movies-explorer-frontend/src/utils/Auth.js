/* export const BASE_URL = 'http://localhost:3003'; */
/* export const BASE_URL = 'https://api.movie-kpa.nomoredomains.rocks'; */
const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://api.movie-kpa.nomoredomains.rocks"
        : "http://localhost:3002";

class Auth {
    constructor(BASE_URL) {
        this._baseUrl = BASE_URL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        /* return Promise.reject(`Ошибка ${res.statusText}`) */
        return Promise.reject(res.json());
    }

    register = (name, email, password) => {
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
            .then(this._checkResponse)
    }

    login = (email, password) => {
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
            .then(this._checkResponse)
    }

    getContent = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(this._checkResponse)
            .then(data => data)
    }


}



const auth = new Auth(BASE_URL);
export default auth;