import { SearchFormSaved } from '../Movies/SearchFormSaved/SearchFormSaved';
import { Preloader } from '../Movies/Preloader/Preloader';
import { InfoToolTipResults } from '../infoToolTip/infoToolTipResults';
import { InfoToolTip } from '../infoToolTip/infoToolTip';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';

export function SavedMovies({

    movies,
    preloader,
    savedMovies,
    fetchShortSavedMovies,
    fetchAllSavedMovies,
    removeMovie,

    noResults,
    message,
    isSuccessApiError,
    errorStyle,

    filteredResults,
    clickedBtnSearch

}) {
    return (
        <>
            <SearchFormSaved
                fetchShortSavedMovies={fetchShortSavedMovies}
                fetchAllSavedMovies={fetchAllSavedMovies}
            />
            {preloader && <Preloader
                preloader={preloader}
            />}

            {savedMovies.length > 0 && <MoviesCardList
                movies={movies}
                savedMovies={savedMovies}
                removeMovie={removeMovie}

                filteredResults={filteredResults}
                clickedBtnSearch={clickedBtnSearch}
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