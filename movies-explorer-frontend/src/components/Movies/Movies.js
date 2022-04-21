import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { Preloader } from '../Movies/Preloader/Preloader';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';
import { InfoToolTipResults } from '../infoToolTip/infoToolTipResults';
import { InfoToolTip } from '../infoToolTip/infoToolTip';

export function Movies({
    moreFilmsBtn,
    handleMoreFilmsClick,
    isSuccessApiError,
    message,
    errorStyle,
    noResults,
    preloader,
    savedMovies,
    movies,
    onSearch,
    onSearchShort,
    saveMovie,
    removeMovie,
    unSaveMovie
}) {
    return (
        <>

            <SearchForm
                onSearch={onSearch}
                onSearchShort={onSearchShort}


            />
            {preloader && <Preloader
                preloader={preloader}
            />}
            {movies.length > 0 && <MoviesCardList
                movies={movies}
                saveMovie={saveMovie}
                savedMovies={savedMovies}
                handleMoreFilmsClick={handleMoreFilmsClick}
                moreFilmsBtn={moreFilmsBtn}
                removeMovie={removeMovie}
                unSaveMovie={unSaveMovie}
            />}
            {noResults && <InfoToolTipResults
                message={message}
            />}
            {isSuccessApiError && <InfoToolTip
                message={message}
                errorStyle={errorStyle}
            />}
        </>
    );
}