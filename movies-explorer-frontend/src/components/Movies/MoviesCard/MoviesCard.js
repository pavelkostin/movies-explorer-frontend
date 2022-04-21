import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import imgSaveFilm from '../../../images/img-save-film.svg';
import imageDelFilm from '../../../images/img-del-film.svg';
const serverUrl = 'https://api.nomoreparties.co/';


export function MoviesCard({ movie, saveMovie, removeMovie,
    savedMovies, unSaveMovie }) {

    const location = useLocation();
    const isLocationSavedMovies = location.pathname === '/saved-movies';
    const [saved, setSaved] = useState(false);
    const [unSaved, setUnSaved] = useState(true);

    const isSaved = movie.id && savedMovies.some((m) => m.movieId === movie.id)

    React.useEffect(() => {
        if (isSaved) {
            setSaved(true);
            setUnSaved(false);
        } else {
            setSaved(false);
            setUnSaved(true);
        }
    }, [isSaved])


    function saveFilmClick() {
        saveMovie(movie);
        console.log(movie);
        setSaved(true)
        setUnSaved(false)
    }

    function unSaveFilmClick() {

        unSaveMovie(movie)

        setSaved(false)
        setUnSaved(true)
    }

    function deleteFilm() {
        removeMovie(movie._id);
        
    }


    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                <h3 className='movies-card__title'>{movie.nameRU}</h3>
                <p className='movies-card__duration'>{movie.duration} минут</p>
            </div>
            <a href={movie.trailerLink || movie.trailer}>
                <img className='movies-card__img'
                    src={`${!isLocationSavedMovies ? serverUrl + movie.image.url : movie.image
                        }`}
                    alt={movie.nameEN} />
            </a>

            {!isLocationSavedMovies && saved && <button onClick={unSaveFilmClick}
            className='movies-card__img-container movies-card__img-container_saved'>
                <img src={imgSaveFilm} alt='saved' />
            </button>}

            {!isLocationSavedMovies && unSaved && <button onClick={saveFilmClick} className='movies-card__img-container'>
                <div className='movies-card__para'>Сохранить</div>
            </button>}

            {isLocationSavedMovies && <button onClick={deleteFilm} className='movies-card__img-container'>
                <img src={imageDelFilm} alt='delete' />
            </button>}

        </li>
    );
}
