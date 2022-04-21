import React from 'react';

export function MoreMoviesButton({ handleMoreFilmsClick }) {


    return (
        <section className='search-section-cardlist'>
            <button onClick={handleMoreFilmsClick}
            className='movies-more-films-container-cardlist'>
                <div className='movies-card__para'>Ещё</div>
            </button>
        </section>

    );
}
