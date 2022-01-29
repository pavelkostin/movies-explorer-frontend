import { Header } from '../Header/Header';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { Preloader } from '../Movies/Preloader/Preloader';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';

export function Movies() {
    return (
        <>
            <Header loginPLaceHolder='Аккаунт'></Header>
            <SearchForm />
            <MoviesCardList />
            <Preloader />
            <Footer />
        </>
    );
}