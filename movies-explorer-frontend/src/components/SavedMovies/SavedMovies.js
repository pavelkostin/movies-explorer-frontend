import { Header } from '../Header/Header';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';
import { Popup } from '../Popup/Popup';
import { Footer } from '../Footer/Footer';

export function SavedMovies() {
    return (
        <>
            <Header loginPLaceHolder='Аккаунт' />
            <SearchForm />
            <MoviesCardList />
            <Popup />
            <Footer />
        </>

    );
}