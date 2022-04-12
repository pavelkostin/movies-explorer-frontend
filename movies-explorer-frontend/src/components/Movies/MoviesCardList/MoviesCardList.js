import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { MoreMoviesButton } from '../MoreMoviesButton/MoreMoviesButton';
import { useLocation } from 'react-router-dom';

export function MoviesCardList({
    handleMoreFilmsClick,
    moreFilmsBtn,
    savedMovies,
    movies,
    saveMovie,
    removeMovie,
    unSaveMovie,
    filteredResults,
    clickedBtnSearch
}) {

    const location = useLocation();
    const isLocationSavedMovies = location.pathname === '/saved-movies';
    const isLocationMovies = location.pathname === '/movies';

    return (
        <section className='card-list__section'>
            <ul className='card-list'>

                {isLocationMovies && movies.map((movie) => {
                    return (
                        <MoviesCard
                            key={movie.id || movie.movieId || movie._id}
                            movie={movie}
                            saveMovie={saveMovie}
                            movies={movies}
                            savedMovies={savedMovies}
                            removeMovie={removeMovie}
                            unSaveMovie={unSaveMovie}
                        />
                    )
                })}

                {clickedBtnSearch === false
                && isLocationSavedMovies
                && savedMovies.map((movie) => {
                    return (
                        <MoviesCard
                            key={movie._id || movie.id || movie.movieId}
                            movie={movie}
                            saveMovie={saveMovie}
                            movies={movies}
                            savedMovies={savedMovies}
                            removeMovie={removeMovie}
                            unSaveMovie={unSaveMovie}
                        />
                    )
                })}

                {clickedBtnSearch === true
                && isLocationSavedMovies
                && filteredResults.map((movie) => {
                    return (
                        <MoviesCard
                            key={movie._id || movie.id || movie.movieId}
                            movie={movie}
                            removeMovie={removeMovie}
                        />
                    )
                })}

            </ul>
            {isLocationMovies && moreFilmsBtn && <MoreMoviesButton
                handleMoreFilmsClick={handleMoreFilmsClick}
            />}

        </section>
    );
}
