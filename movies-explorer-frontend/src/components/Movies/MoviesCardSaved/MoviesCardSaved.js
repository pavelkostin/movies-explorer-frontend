import React from 'react';
import imageDelFilm from '../../../images/img-del-film.svg';


export function MoviesCardSaved({ movie, removeMovie }) {

    function deleteFilm() {
        removeMovie(movie._id);
    }

    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                <h3 className='movies-card__title'>{movie.nameRU}</h3>
                <p className='movies-card__duration'>{movie.duration} минут</p>
            </div>
            <a href={movie.trailer}>
                <img className='movies-card__img'
                    src={movie.image}
                    alt={movie.nameEN} />
            </a>
            <button onClick={deleteFilm} className='movies-card__img-container'>
                <img src={imageDelFilm} alt='delete' />
            </button>

        </li>
    );
}
