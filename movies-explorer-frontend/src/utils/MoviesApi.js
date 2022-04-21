export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';


function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const getFilms = () => {
    return fetch(`${MOVIES_API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkResponse)
        .then(data => data)
}