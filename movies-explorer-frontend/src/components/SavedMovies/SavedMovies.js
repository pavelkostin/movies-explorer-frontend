import { SearchFormSaved } from '../Movies/SearchFormSaved/SearchFormSaved';
import { Preloader } from '../Movies/Preloader/Preloader';
import { MoviesCardListSaved } from '../Movies/MoviesCardListSaved/MoviesCardListSaved';
import { InfoToolTipResults } from '../infoToolTip/infoToolTipResults';
import { InfoToolTip } from '../infoToolTip/infoToolTip';

export function SavedMovies({
    noResults,
    message,
    preloader,
    savedMovies,
    fetchShortSavedMovies,
    fetchAllSavedMovies,
    removeMovie,
    isSuccessApiError,
    errorStyle,
    handleMoreSavedFilms,
    moreFilmsBtn
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
            {savedMovies.length > 0 && <MoviesCardListSaved
                savedMovies={savedMovies}
                removeMovie={removeMovie}
                handleMoreSavedFilms={handleMoreSavedFilms}
                moreFilmsBtn={moreFilmsBtn}
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