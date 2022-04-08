import React from 'react';

export function MoreMoviesButtonSaved({ handleMoreSavedFilms }) {


    return (


        <section className='search-section-cardlist'>
            <button onClick={handleMoreSavedFilms}
                className='movies-more-films-container-cardlist'>
                <div className='movies-card__para'>Ещё</div>
            </button>
        </section>

    );
}
