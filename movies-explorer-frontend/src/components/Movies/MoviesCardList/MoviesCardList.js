import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { MoreMoviesButton } from '../MoreMoviesButton/MoreMoviesButton';

export function MoviesCardList({
    handleMoreFilmsClick,
    moreFilmsBtn,
    savedMovies,
    movies,
    saveMovie
}) {
    return (
        <section className='card-list__section'>
            <ul className='card-list'>

                {movies.map((movie) => {
                    return (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            saveMovie={saveMovie}
                            movies={movies}
                            savedMovies={savedMovies}
                        />
                    )
                })}

            </ul>
            {moreFilmsBtn && <MoreMoviesButton
                handleMoreFilmsClick={handleMoreFilmsClick}
            />}
        </section>
    );
}
