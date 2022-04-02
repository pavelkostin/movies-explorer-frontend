import React from 'react';

export function MoreMoviesButtonSaved({ handleMoreSavedFilms }) {


    return (
        <div className='search-section'>
            <button onClick={handleMoreSavedFilms} className='movies-more-films-container'>
                <div className='movies-card__para'>Ещё</div>
            </button>
        </div>

    );
}
