import React from 'react';
import { MoviesCardSaved } from '../MoviesCardSaved/MoviesCardSaved';
import { MoreMoviesButtonSaved } from '../MoreMoviesButtonSaved/MoreMoviesButtonSaved';

export function MoviesCardListSaved({
    savedMovies,
    removeMovie,
    handleMoreSavedFilms,
    moreFilmsBtn
}) {
    return (
        <section className='card-list__section'>
            <ul className='card-list'>

                {savedMovies.map((movie) => {
                    return (
                        <MoviesCardSaved
                            key={movie._id}
                            movie={movie}
                            removeMovie={removeMovie}
                        />
                    )
                })}
            </ul>

            {moreFilmsBtn && <MoreMoviesButtonSaved
                handleMoreSavedFilms={handleMoreSavedFilms}
            />}
            
        </section>
    );
}