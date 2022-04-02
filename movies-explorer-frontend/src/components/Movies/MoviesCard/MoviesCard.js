import React, { useState } from 'react';
import imgSaveFilm from '../../../images/img-save-film.svg';

export function MoviesCard({ movie, saveMovie, savedMovies }) {

    const [saved, setSaved] = useState(false)

    const isSaved = movie.id && savedMovies.some((m) => m.movieId === movie.id)

    React.useEffect(() => {
        if (isSaved) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [isSaved])


    function saveFilmClick() {
        if (!isSaved) {
            saveMovie(movie);
            setSaved(true)
        }
    }



    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                <h3 className='movies-card__title'>{movie.nameRU}</h3>
                <p className='movies-card__duration'>{movie.duration} минут</p>
            </div>
            <a href={movie.trailerLink}>
                <img className='movies-card__img'
                    src={`https://api.nomoreparties.co/${movie.image.url}`}
                    alt={movie.nameEN} />
            </a>


            {saved ? <button className='movies-card__img-container movies-card__img-container_saved'>
                <img src={imgSaveFilm} alt='saved' />
            </button>
                :
                <button onClick={saveFilmClick} className='movies-card__img-container'>
                    <div className='movies-card__para'>Сохранить</div>
                </button>
            }

        </li>
    );
}
