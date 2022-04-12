/* export const BASE_URL = 'http://localhost:3003'; */
export const BASE_URL = 'https://api.movie-kpa.nomoredomains.rocks';

export const SERVER_URL = 'https://api.nomoreparties.co'

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.json());
}

export const setUserInfo = (user) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email
        })
    })
        .then(checkResponse)
        .then(data => data)
}

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(checkResponse)
        .then(data => data)
}

export const postMovie = (movie) => {
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
        .then(checkResponse)
}

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(checkResponse)
        .then(data => data)
}

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(checkResponse)
        .then(data => data)
}

