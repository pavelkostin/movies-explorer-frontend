import React, { useState } from 'react';
import imgSaveFilm from '../../../images/img-save-film.svg';
import imageFilm from '../../../images/photo.jpg';
import imageDelFilm from '../../../images/img-del-film.svg';

export function MoviesCard() {

    const [inactive, setInactive] = useState(true);
    const [active, setActive] = useState(false);
    const [deleted, setDeleted] = useState(false);


    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                <h3 className='movies-card__title'>В погоне за Бэнкси</h3>
                <p className='movies-card__duration'>27 минут</p>
            </div>
            <img className='movies-card__img' src={imageFilm} alt='film-pic' />
            <button className={`movies-card__img-container ${active ? 'movies-card__img-container_saved' : ''}`}>
                {inactive && <div className='movies-card__para'>Сохранить</div>}
                {active && <img src={imgSaveFilm} alt='saved' />}
                {deleted && <img src={imageDelFilm} alt='delete' />}
            </button>
        </li>
    );
}