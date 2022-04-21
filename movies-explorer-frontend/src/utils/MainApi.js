/* export const BASE_URL = 'http://localhost:3002'; */
export const BASE_URL = 'https://api.movie-kpa.nomoredomains.rocks';

export const SERVER_URL = 'https://api.nomoreparties.co'

class MAINAPI {
    constructor(BASE_URL) {
        this._baseUrl = BASE_URL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.json());
    }

    setUserInfo = (user) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email
            })
        })
            .then(this._checkResponse)
            .then(data => data)
    }

    getUserInfo = () => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
            .then(data => data)
    }

    postMovie = (movie) => {
        const {
            country,
            director,
            duration,
            year,
            description,
            trailerLink,
            nameRU,
            nameEN,
        } = movie;
        return fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                country: `${country}`,
                director: `${director}`,
                duration: +duration,
                year: `${year}`,
                description: `${description}`,
                image: `${SERVER_URL}${movie.image.url}`,
                trailer: `${trailerLink}`,
                nameRU: `${nameRU}`,
                nameEN: `${nameEN}` || '',
                thumbnail: `${SERVER_URL}${movie.image.formats.thumbnail.url}`,
                movieId: +movie.id,
            })
        })
            .then(this._checkResponse)
    }

    getMovies = () => {
        return fetch(`${BASE_URL}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
            .then(data => data)
    }

    deleteMovie = (movieId) => {
        return fetch(`${BASE_URL}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse)
            .then(data => data)
    }

}


const mainApi = new MAINAPI(BASE_URL);
export default mainApi;