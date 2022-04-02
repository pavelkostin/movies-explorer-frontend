import React from 'react';

export function MoreMoviesButton({ handleMoreFilmsClick }) {


    return (
        <div className='search-section'>
            <button onClick={handleMoreFilmsClick} className='movies-more-films-container'>
                <div className='movies-card__para'>Ещё</div>
            </button>
        </div>

    );
}
